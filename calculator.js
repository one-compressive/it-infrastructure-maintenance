window.onload = function() {
  let a = '';
  let b = '';
  let result = '';
  let op = null;

  const output = document.getElementById("result");

  function updateOutput(val) {
    output.innerHTML = val === '' ? '0' : val;
  }

  function inputDigit(d) {
    if (!op) {
      if (d === '.' && a.includes('.')) return;
      if (a === '0' && d !== '.') a = d;
      else a += d;
      updateOutput(a);
    } else {
      if (d === '.' && b.includes('.')) return;
      if (b === '0' && d !== '.') b = d;
      else b += d;
      updateOutput(b);
    }
  }

  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '.'];

  digits.forEach(d => {
    const id = 'btn_digit_' + d.replace('.', 'dot');
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => inputDigit(d);
    }
  });

  document.getElementById("btn_op_plus").onclick = () => { if (a) op = '+'; };
  document.getElementById("btn_op_minus").onclick = () => { if (a) op = '-'; };
  document.getElementById("btn_op_mult").onclick = () => { if (a) op = 'x'; };
  document.getElementById("btn_op_div").onclick = () => { if (a) op = '/'; };

  document.getElementById("btn_op_equal").onclick = () => {
    if (a && b && op) {
      switch (op) {
        case '+': result = (+a) + (+b); break;
        case '-': result = (+a) - (+b); break;
        case 'x': result = (+a) * (+b); break;
        case '/':
          if (+b === 0) {
            alert("Деление на ноль невозможно!");
            return;
          }
          result = (+a) / (+b);
          break;
      }
      a = result.toString();
      b = '';
      op = null;
      updateOutput(a);
    }
  };

  document.getElementById("btn_op_clear").onclick = () => {
    a = '';
    b = '';
    op = null;
    result = '';
    updateOutput(0);
  };

  document.getElementById("btn_op_sign").onclick = () => {
    if (!op) {
      if (a) a = (+a * -1).toString();
      updateOutput(a || 0);
    } else {
      if (b) b = (+b * -1).toString();
      updateOutput(b || 0);
    }
  };

  document.getElementById("btn_op_percent").onclick = () => {
    if (!op) {
      if (a) a = (+a / 100).toString();
      updateOutput(a || 0);
    } else {
      if (b) b = (+b / 100).toString();
      updateOutput(b || 0);
    }
  };

  document.getElementById("btn_op_sqrt").onclick = () => {
    if (!op && a) {
      a = Math.sqrt(+a).toString();
      updateOutput(a);
    } else if (b) {
      b = Math.sqrt(+b).toString();
      updateOutput(b);
    }
  };

  document.getElementById("btn_op_square").onclick = () => {
    if (!op && a) {
      a = Math.pow(+a, 2).toString();
      updateOutput(a);
    } else if (b) {
      b = Math.pow(+b, 2).toString();
      updateOutput(b);
    }
  };

  document.getElementById("btn_op_fact").onclick = () => {
    function factorial(n) {
      return n <= 1 ? 1 : n * factorial(n - 1);
    }
    if (!op && a) {
      a = factorial(Math.floor(+a)).toString();
      updateOutput(a);
    } else if (b) {
      b = factorial(Math.floor(+b)).toString();
      updateOutput(b);
    }
  };
};
