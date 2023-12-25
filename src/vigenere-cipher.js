const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    this.validateInput(message, key);
    const encodedMessage = this.processMessage(message, key, 1);
    return this.direct ? encodedMessage : this.reverseString(encodedMessage);
  }

  decrypt(message, key) {
    this.validateInput(message, key);
    const decodedMessage = this.processMessage(message, key, -1);
    return this.direct ? decodedMessage : this.reverseString(decodedMessage);
  }

  validateInput(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
  }

  processMessage(message, key, direction) {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    message = message.toUpperCase();
    key = this.extendKey(key, message);

    let result = '';
    for (let i = 0, j = 0; i < message.length; i++) {
      if (abc.includes(message[i])) {
        let currentInd =
          (message[i].codePointAt() - 65 + direction * (key[j].codePointAt() - 65)) % 26;
        if (currentInd < 0) {
          currentInd = (currentInd + 26) % 26;
        }
        result += abc[currentInd];
        j++;
      } else {
        result += message[i];
      }
    }

    return result;
  }

  extendKey(key, message) {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();

    if (key.length < message.length) {
      let count = 0;
      for (let i = 0; i < message.length; i++) {
        if (abc.includes(message[i])) {
          count++;
        }
      }
      key = key.repeat(count).slice(0, count);
    }

    return key;
  }

  reverseString(str) {
    return str.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine,
};
