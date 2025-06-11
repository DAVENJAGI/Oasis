document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('chat_enter');
    const sendButton = document.getElementById('send_button');
  
    textarea.addEventListener('input', () => {
        const text = textarea.value.trim(); 
        sendButton.disabled = text === '';
    });
  });
  