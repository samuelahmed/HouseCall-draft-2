//Prevents zooming on double tap on mobile devices

export  function getIOSInputEventHandlers() {
  return {
    onTouchStart: (e: { currentTarget: { style: { fontSize: string; }; }; }) => {
      e.currentTarget.style.fontSize = "16px";
    },
    onBlur: (e: { currentTarget: { style: { fontSize: string; }; }; }) => {
      e.currentTarget.style.fontSize = "";
    }
  };
}

