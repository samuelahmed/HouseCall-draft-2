


export  function getIOSInputEventHandlers() {
//   if (isIOS()) {
//     return {};
//   }

  return {
    onTouchStart: (e: { currentTarget: { style: { fontSize: string; }; }; }) => {
      e.currentTarget.style.fontSize = "16px";
    },
    onBlur: (e: { currentTarget: { style: { fontSize: string; }; }; }) => {
      e.currentTarget.style.fontSize = "";
    }
  };
}

