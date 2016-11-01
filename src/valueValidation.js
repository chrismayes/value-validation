exports.printMsg = function() {
  console.log("A simple javascript value validation tool: valueValidation([rules], data)");
}

const messages = {
  //%1, %2, %3, etc maps to validation parameters
  //Date validation currently only handles MM/DD/YYYY or MM-DD-YYYY format
  greaterThan: "Must be a number greater than %1",
  greaterThanDate: "Must contain a date after %1",
  greaterThanOrEqualDate: "Must contain a date on or after %1",
  isAlpha: "Must contain only alphabetical characters",
  isAlphaCountryCode: "Must be a valid country",
  isAlphaDash: "Must only contain alpha-numeric characters, underscores, and dashes",
  isAlphaNumeric: "Must only contain alpha-numeric characters",
  isBase64: "Must contain a base64 string",
  isCreditCard: "Must contain a valid credit card number",
  isDate: "Must be a valid date",
  isDecimal: "Must contain a decimal number",
  isEmail: "Invalid email address",
  isEmailList: "Invalid email address found in email address list",
  isFileType: "Must contain only %1 files",
  isInteger: "Invalid integer",
  isIpAddress: "Must contain a valid IP address",
  isLength: "Must have a length of exactly %1",
  isNaturalNumber: "Must contain a positive whole number or zero",
  isNaturalNumberNoZero: "Must contain a positive whole number",
  isNumeric: "Must contain numeric characters only",
  isNumericCountryCode: "Must be a valid country",
  isNumericDash: "Must contain only numeric characters or dash",
  isPhoneCharacters: "Must contain a valid phone number",
  isUrl: "Must contain a valid URL",
  lessThan: "Must be a number less than %1",
  lessThanDate: "Must contain a date before %1",
  lessThanOrEqualDate: "Must contain a date on or before %1",
  maxLength: "Must have a maximum length of at most %1",
  minLength: "Must have a minimum length of at least %1"
};

//Regular expressions used in validation
const re = {
  isAlpha: /^[a-z]+$/i,
  isAlphaCountryCode: /^[A-Z]{3}$/,
  isAlphaDash: /^[a-z_\-]+$/i,
  isAlphaNumeric: /^[a-z0-9]+$/i,
  isBase64: /^[a-z0-9\/\+=]+$/i,
  isCreditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  isDate: /\d{1,2}[-/]\d{1,2}[-/]\d{4}/,
  isDecimal: /^\-?[0-9]*\.?[0-9]+$/,
  isEmail: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
  isInteger: /^\-?[0-9]+$/,
  isIpAddress: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,
  isNaturalNumber: /^[0-9]+$/,
  isNaturalNumberNoZero: /^[1-9][0-9]*$/,
  isNumber: /^\-?[0-9]+(\.[0-9]+)?$/,
  isNumeric: /^[0-9]+$/,
  isNumericCountryCode: /^[0-9]{1,3}$/,
  isNumericDash: /^[0-9\-\s]+$/,
  isPhoneCharacters: /^[0-9+\.\-\(\) ]+$/,
  isUrl: /[-a-z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-z0-9@:%_\+.~#?&//=]*)?/gi
};

//Validation rules
const validators = {
  greaterThan: (value, parameters) => {
    const limitValue = parameters[0];
    if (!re.isDecimal.test(value)) return false;
    return (parseFloat(value) > parseFloat(limitValue));
  },
  greaterThanDate: (value, parameters) => {
    const date = parameters[0];
    const enteredDate = getValidDate(value);
    const validDate = getValidDate(date);
    if (!validDate || !enteredDate) return false;
    return enteredDate > validDate;
  },
  greaterThanOrEqualDate: (value, parameters) => {
    const date = parameters[0];
    const enteredDate = getValidDate(value);
    const validDate = getValidDate(date);
    if (!validDate || !enteredDate) return false;
    return enteredDate >= validDate;
  },
  isAlpha: (value) => {
    return re.isAlpha.test(value);
  },
  isAlphaCountryCode: (value) => {
    return re.isAlphaCountryCode.test(value);
  },
  isAlphaDash: (value) => {
    return re.isAlphaDash.test(value);
  },
  isAlphaNumeric: (value) => {
    return re.isAlphaNumeric.test(value);
  },
  isBase64: (value) => {
    return re.isBase64.test(value);
  },
  isCreditCard: (value) => {
    return re.isCreditCard.test(value);
  },
  isDate: (value) => {
    const enteredDate = getValidDate(value);
    if (!enteredDate) return false;
    else return true;
  },
  isDecimal: (value) => {
    return re.isDecimal.test(value);
  },
  isEmail: (value) => {
    return re.isEmail.test(value);
  },
  isEmailList: (value) => {
    for (let emailAddress of value.split(/\s*[,;]\s*/g))
      if (!re.isEmail.test(emailAddress)) return false;
    return true;
  },
  isFileType: (value, parameters) => {
    const type = parameters[0];
    const ext = value.substr((value.lastIndexOf(".") + 1));
    const arrType = type.split(/\s*[,;]\s*/);
    const len = arrType.length;
    let inArray = false;
    let i = 0;
    for (i; i < len; i++) {
      if (ext.toUpperCase() == arrType[i].toUpperCase()) inArray = true;
    }
    return inArray;
  },
  isInteger: (value) => {
    return re.isInteger.test(value);
  },
  isIpAddress: (value) => {
    return re.isIpAddress.test(value);
  },
  isLength: (value, parameters) => {
    const length = parameters[0];
    if (!re.isNumeric.test(length)) return false;
    return (value.length === parseInt(length, 10));
  },
  isNaturalNumber: (value) => {
    return re.isNaturalNumber.test(value);
  },
  isNaturalNumberNoZero: (value) => {
    return re.isNaturalNumberNoZero.test(value);
  },
  isNumeric: (value) => {
    return re.isNumeric.test(value);
  },
  isNumericCountryCode: (value) => {
    return re.isNumericCountryCode.test(value);
  },
  isPhoneCharacters: (value) => {
    return re.isPhoneCharacters.test(value);
  },
  isUrl: (value) => {
    return re.isUrl.test(value);
  },
  lessThan: (value, parameters) => {
    const limitValue = parameters[0];
    if (!re.isDecimal.test(value)) return false;
    return (parseFloat(value) < parseFloat(limitValue));
  },
  lessThanDate: (value, parameters) => {
    const date = parameters[0];
    const enteredDate = getValidDate(value);
    const validDate = getValidDate(date);
    if (!validDate || !enteredDate) return false;
    return enteredDate < validDate;
  },
  lessThanOrEqualDate: (value, parameters) => {
    const date = parameters[0];
    const enteredDate = getValidDate(value);
    const validDate = getValidDate(date);
    if (!validDate || !enteredDate) return false;
    return enteredDate <= validDate;
  },
  maxLength: (value, parameters) => {
    const limitValue = parameters[0];
    if (!re.isNumeric.test(length)) return false;
    return (value.length <= parseInt(limitValue, 10));
  },
  minLength: (value, parameters) => {
    const limitValue = parameters[0];
    if (!re.isNumeric.test(length)) return false;
    return (value.length >= parseInt(limitValue, 10));
  }
};

export default function valueValidation(rules, data) {
  if(rules) {
    let valid = false;
    const value = data.toString().trim();
    if(rules.find(rule => rule === "required") === "required" && value === "") {
      //Handle "required" validation rule first
      return [{
        rule: "required",
        message: "This is a required value"
      }];
    } else {
      //All other validation rules now checked if "required" validation passes and there is data
      if(value !== "") {
        return rules.map((rule) => {
          //Basic return object
          const replyData = {
            rule: rule,
            message: "message"
          };

          //Get rule name, extract parameters, set up message
          let ruleName = "";
          let parameters = [];
          let thisMessage = "";
          if(/.*\(.*\).*$/.test(rule)) {
            //rule contains parameters... format = rule(parameter1, parameter2, etc)
            ruleName = rule.split("(")[0];
            parameters = (/\(([^)]+)\)/.exec(rule))[1].split(/\s*,\s*/);
            thisMessage = messages[ruleName];
            parameters.forEach((param, i) => {
              thisMessage = thisMessage.replace("%" + (i+1), param);
            });
          } else {
            ruleName = rule;
            thisMessage = messages[ruleName];
          }

          //Validate value
          if(ruleName && ruleName.length > 0 && ruleName !== "required") {
            if(!validators[ruleName](value, parameters))
              return { ...replyData, message: thisMessage };
            else return {};
          }
          else return {};
        }).filter((result) => Object.keys(result).length > 0);
      } else return [];
    }
  } else {
    return [];
  }
}

//***Helper Functions***

function getValidDate(date) {
  let validDate = "";
  if (date.match("today") || date.match(re.isDate)) {
    validDate = new Date();
    let validDateArray;
    validDate.setHours(0);
    validDate.setMinutes(0);
    validDate.setSeconds(0);
    validDate.setMilliseconds(0);
    if (!date.match("today")) {
      validDateArray = date.split(/[\/-]/);
      validDate.setFullYear(validDateArray[2]);
      validDate.setMonth(validDateArray[0] - 1);
      validDate.setDate(validDateArray[1]);
    }
  } else if (new Date(date)) {
    validDate = new Date(date);
  } else {
    return false;
  }
  return validDate;
}
