


export function useBodyScroll(){

    function scrollToBottom(){
        const element = document.getElementById("body-bottom");
        element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function scrollToTop(){
        const element = document.getElementById("body-top");
        element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }



    return {
        scrollToBottom,
        scrollToTop
    }
}