import Swal from "sweetalert2";

const showToast = (
  title: string,
  icon: "success" | "error" | "warning" | "info" = "success",
) => {
  return Swal.fire({
    toast: true,
    position: "bottom-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTION") {
    sendResponse({ selection: window.getSelection()?.toString() });
  }
  if (message.type === "APPLY_PROMPT") {
    const promptValue = message.prompt;
    const activeElement = document.activeElement as
      | HTMLTextAreaElement
      | HTMLInputElement;

    if (
      activeElement &&
      (activeElement.tagName === "TEXTAREA" ||
        activeElement.tagName === "INPUT" ||
        activeElement.isContentEditable)
    ) {
      const start = activeElement.selectionStart as number;
      const end = activeElement.selectionEnd as number;

      if (document.execCommand) {
        activeElement.focus();
        document.execCommand("insertText", false, promptValue);

        activeElement.setSelectionRange(start, start + promptValue.length);
      } else {
        const currentValue = activeElement.value;
        activeElement.value =
          currentValue.substring(0, start) +
          promptValue +
          currentValue.substring(end);

        activeElement.setSelectionRange(start, start + promptValue.length);
        const inputEvent = new Event("input", { bubbles: true });
        activeElement.dispatchEvent(inputEvent);
      }

      showToast("Text replaced successfully!");
    } else {
      if (!document.hasFocus()) {
        window.focus();
      }
      setTimeout(() => {
        navigator.clipboard
          .writeText(promptValue)
          .then(() => showToast("Copied to clipboard!"))
          .catch((e) => showToast(e, "error"));
      }, 300);
    }
  }
});
