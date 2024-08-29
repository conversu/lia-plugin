import { v4 as uuidv4 } from 'uuid';
// import { saveAs } from 'file-saver';

export function generateKey() {

    return uuidv4();
}

export function range(start: number, end: number) {
    var list = [];
    for (var i = start; i <= end; i++) {
        list.push(i);
    }
    return list
}

export function handleLinkRedirect(link: string) {

    window.open(link, '_blank', 'noopener noreferrer');
}

export async function copyToClipboard(copyValue: string) {

    try {

        await navigator.clipboard.writeText(copyValue);

    } catch (err) {

    }
}


export function calculateMinutes(time?: string | null) {

    if (!time || !time.includes(':')) {

        return 0;
    }

    const [hour, min] = time.split(':');

    return (Number(hour) * 60) + Number(min);
}


export function getFirstName(name?: string | null) {

    if (!name) {
        return '';
    }

    if (name.includes(' ')) {

        return name.split(' ')[0];
    }

    return name;
}

export function downloadPdf(blob: Blob, fileName: string) {

    // Use FileSaver.js to save the Blob as a file
    // saveAs(blob, fileName);
}