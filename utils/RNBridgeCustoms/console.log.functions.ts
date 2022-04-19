export const Log = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  // Foreground (text) colors
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',
  },
  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

// export const log = (color: string, text: string) => {
//   console.log(`${color}%s${Log.reset}`, text);
// };

export const logObject = <T>(color: string, object?: T) => {
  for (const item in object) {
    if (Object.prototype.hasOwnProperty.call(object, item)) {
      const subObject = object[item];
      if (typeof subObject === 'object') {
        console.log(`${color}%s${Log.reset}`, item);
        logObject(Log.fg.blue, subObject);
      } else {
        console.log(`${color}%s${Log.reset}`, item, subObject);
      }
    }
  }
};

export const t_color = {
  red: 'color: red',
  grey: 'color: rgb(112,128,144)',
  green: 'color: green',
  pale_spring_bud: 'color: rgb(236,235,189)',
  gin: 'color: rgb(216,228,188)',
};

export const t_font = {
  bold_50: 'font-weight: bold; font-size: 50px; ',
  bold_40: 'font-weight: bold; font-size: 40px; ',
  bold_20: 'font-weight: bold; font-size: 20px; ',
  bold_15: 'font-weight: bold; font-size: 15px; ',
  bold_14: 'font-weight: bold; font-size: 14px; ',
  bold_10: 'font-weight: bold; font-size: 10px; ',

  italic_20: 'font-weight: italic; font-size: 20px; ',
  italic_15: 'font-weight: italic; font-size: 15px; ',
  italic_10: 'font-weight: italic; font-size: 10px; ',

  monospace: 'font-family:monospace;',
};

export const text = {
  font: t_font,
  t_color,
};

export const bg_color = {
  red: 'background-color: red',
  green: 'background-color: green',
};

export const background = {
  bg_color,
};

export const s_log = {
  ...text,
  ...background,
  // base: ['color: #fff', 'padding: 16'],
  // warning: ['color: #eee', 'background-color: red'],
  // success: ['background-color: green'],
  // /**
  //  * font-weight: bold;
  //  * font-size: 50px;
  //  * color: orange; font-family:monospace;'
  //  */
  // bold_50: 'font-weight: bold; font-size: 50px; ',
};

export const fontFamily = {};

export const log = <T>(item: T, ...s_log_style: string[]) => {
  let style = [].join(';') + ';';
  style += s_log_style.join(';'); // Add any additional styles
  if (typeof item === 'object') {
    for (const i in item) {
      if (Object.prototype.hasOwnProperty.call(item, i)) {
        const subObject = item[i];
        if (typeof subObject === 'object') {
          console.groupCollapsed(`%c${i}`, style);
          console.table(subObject);
          console.groupEnd();
        } else {
          console.log(`%c${i}`, style, subObject);
        }
      }
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`%c${item}`, style);
  }
};
