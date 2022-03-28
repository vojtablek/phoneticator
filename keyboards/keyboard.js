const buttons = document.querySelectorAll(".keyboard__row > *"),
      keyboard = document.getElementById('keyboard'),
      output = document.getElementById(keyboard.getAttribute('data-keyboard-output'));

var isShifted = false,
    isCapsLocked = false;

const deshift = () => {
  buttons.forEach((button, i) => {
    button.innerHTML = button.innerHTML.toLowerCase();
    isShifted = false;
  });
}

const buttonShift = () => {
  buttons.forEach((button, i) => {
    button.innerHTML = button.innerHTML.toUpperCase();
    isShifted = true;
  });
}

const buttonBackspace = () => {
  output.value = output.value.slice(0, -1);
}

const buttonCapsLock = () => {
  isShifted = false;
  if (isCapsLocked) {
    buttons.forEach((button, i) => {
      button.innerHTML = button.innerHTML.toLowerCase();
    });
    isCapsLocked = false;
  } else {
    buttons.forEach((button, i) => {
      button.innerHTML = button.innerHTML.toUpperCase();
    });
    isCapsLocked = true;
  }
}

const keyClick = (key) => {
  if (key.target.dataset.keyboardRole == 'special') {
    switch (key.target.dataset.keyboardKey) {
      case 'shift': buttonShift(); break;
      case 'backspace': buttonBackspace(); break;
      case 'space': output.value += ' '; break;
      case 'capsLock': buttonCapsLock(); break;
    }
    return;
  }
  output.value += key.target.innerHTML;
  if (isShifted) deshift();
}

[...buttons].forEach((key, i) => {
  key.addEventListener('click', keyClick);
});

const dragKeyboard = () => {
  var leftPosition,
      topPosition,
      cursorX,
      cursorY;

  keyboard.onmousedown = (e) => {
    e.preventDefault()
    cursorX = e.clientX;
    cursorY = e.clientY;

    document.onmouseup = () => {
      document.onmouseup = undefined;
      document.onmousemove = undefined;
    }
    document.onmousemove = drag;
  }

  let drag = (e) => {
    e.preventDefault()
    leftPosition = cursorX - e.clientX;
    topPosition = cursorY - e.clientY;
    cursorX = e.clientX;
    cursorY = e.clientY;
    keyboard.style.top = `${keyboard.offsetTop - topPosition}px`;
    keyboard.style.left = `${keyboard.offsetLeft - leftPosition}px`;
  }
}

dragKeyboard();