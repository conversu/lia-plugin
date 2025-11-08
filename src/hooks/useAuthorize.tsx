/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { IBot } from '../@types/bot';
import { format, formatISO } from 'date-fns';

const parseTime = (time: string): [number, number] => {
  const [hour, minute] = time.split(':').map(Number);
  return [hour, minute];
};

const isWithinSchedule = (start?: string | null, end?: string | null): boolean => {
  if (!start || !end) {
    return true; // No restrictions
  }

  const current = new Date()

  const [startHour, startMinute] = parseTime(start);
  const [endHour, endMinute] = parseTime(end);

  const currentTime = current.getHours() * 60 + current.getMinutes();
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;

  if (endTime < startTime) {
    return currentTime >= startTime || currentTime <= endTime;
  }

  return currentTime >= startTime && currentTime <= endTime;
};

export const useAuthorize = (params: {
  token?: string | null;
  dataSet?: any;
  onTooltipOpen?: () => void;
  defaultStartHour?: string | null;
  defaultEndHour?: string | null;
}) => {
  const {
    token,
    dataSet: parameters,
    onTooltipOpen = () => { },
    defaultEndHour = null,
    defaultStartHour = null,
  } = params;

  const bot = useRef<IBot | null>(null);
  const url = useRef<string | null>(null);
  const notification = useRef<string | null>(null);
  const error = useRef<string | null>(null);

  const [status, setStatus] = useState<'loading' | 'error' | 'authorized' | 'disabled'>('loading');

  const mutation = useMutation(
    async (token: string) => {
      const response = await axios.post(
        `${process.env.API_ENDPOINT}/plugin/authorize`,
        {
          token,
          parameters,
        },
        {
          headers: {
            'x-origin': window.location.href,
            // requester: process.env.API_KEY,
            'x-current-time': format(new Date(), 'HH:mm'),
            'x-timestamp': formatISO(new Date()),
            'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
        }
      );
      return response.data;
    },
    {
      retry: 1,
      onMutate: () => {
        setStatus('loading');
      },
      onSuccess: (data) => {
        let start = defaultStartHour;
        let end = defaultEndHour;

        if (data.schedule?.start && data.schedule?.end) {
          start = data.schedule.start;
          end = data.schedule.end;
        }

        if (!isWithinSchedule(start, end)) {
          return setDisabled('server', start, end)
        }

        bot.current = {
          alias: data.bot.alias,
          uuid: data.bot.uuid,
          tooltip: data.bot.tooltip,
          layout: {
            agent: JSON.parse(data.bot.layout.agent),
            user: JSON.parse(data.bot.layout.user),
            bot: JSON.parse(data.bot.layout.bot),
            colors: JSON.parse(data.bot.layout.colors),
          },
        };
        notification.current = data.notificationEndpoint;
        url.current = data.liaEndpoint;
        setStatus('authorized');
      },
      onError: (err: AxiosError<{ reason?: string }>) => {
        let message = err.response?.data?.reason ?? null;

        if (err.code === 'ERR_NETWORK') {
          message =
            'Serviço de autorização indisponível ou dispositivo sem conectividade com a internet, por favor, confira sua conexão. Se o problema persistir, contate um administrador.';
        }

        if (!message) {
          switch (err.response?.status) {
            case 500:
              message = 'Falha ao autorizar plugin, por favor, contate um administrador.';
              break;
            case 404:
              message = 'Plugin não encontrado, por favor, contate um administrador.';
              break;
            case 403:
              message = 'Plugin não autorizado.';
              break;
            case 401:
              message = 'Falha ao autorizar plugin, por favor, contate um administrador.';
              break;
            default:
              message = `[${err.response?.status}] Plugin não autorizado.`;
              break;
          }
        }

        console.error(`[CONVERSU] ${message}`);
        error.current = message;
        setStatus('error');
      },
    }
  );

  const setError = () => {
    console.error('[CONVERSU] O token precisa ser informado através da propriedade "data-token" dentro da div de id "conversu-plugin".');
    setStatus('error');
  }

  const setDisabled = (type: 'parameter' | 'server', start?: string | null, end?: string | null) => {
    if (!!start && !!end) {
      console.warn(`[CONVERSU] Horário fora do permitido (${start} às ${end}, definidos pelo ${type === 'server' ? 'administrador' : 'instalador'}).`);
      setStatus('disabled');
    }
    return;
  }

  function refetch() {

    if (!isWithinSchedule(defaultStartHour, defaultEndHour)) {
      return setDisabled('parameter', defaultStartHour, defaultEndHour)
    }

    if (token) {
      mutation.mutate(token);
      onTooltipOpen?.();
    } else {
      setError();
    }
  }

  return {
    status,
    error: error.current,
    bot: bot.current,
    url: url.current,
    notification: notification.current,
    refetch,
  };
};
