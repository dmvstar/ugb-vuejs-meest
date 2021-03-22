var regSD10  = "^[0-9]{10}$"
var regSD09  = "^[0-9]{9}$"
var regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
var regSBIINN= "(^[0-9]{10}$)|(^[0-9]{9}$)|(^[А-Ю][А-Ю][0-9]{6}$)";
var validateMap = {
    "person": {
        "inn": {
            "needed" : true,
            "express": regSBIINN,
            "message": "Ошибка формата поля ИНН"
        },
        "sex": {
            "needed" : true,
            "express": "^[MFЧЖ]$",
            "message": "Ошибка формата поля ПОЛ"
        },
        "birthDay": {
            "needed" : true,
            "express":"^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$",
            "message": "Ошибка формата поля birthDay"
        },
        "type": {
            "needed" : true,
            "express": "^physical$",
            "message": "Ошибка формата поля Тип"
        },
        "lastName": {
            "needed" : true,
            "express": "^[А-я]*$",
            "message": "Ошибка формата поля Фамилия"
        },
        "firstName": {
            "needed" : true,
            "express": "^[А-я]*$",
            "message": "Ошибка формата поля Имя"
        },
        "middleName": {
            "needed" : true,
            "express": "^[А-я]*$",
            "message": "Ошибка формата поля Отчество"
        },

        "ext": {
            "num": {
                "needed" : false,
                "express": regSD10,
                "message": "Ошибка формата поля NUM"
            }
        }
    },
    "documents": [
        {
            "type": {
                "needed" : true,
                "express":"^(паспорт|passport|idpassport)$",
                "message": "Ошибка формата паспорта, поле type"
            },
            "dateIssue": {
                "needed" : true,
                "express":"^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$",
                "message": "Ошибка формата паспорта, поле dateIssue"
            }
        }
    ],
    "addresses": [
        {
            "type": {
                "needed" : true,
                "express":"^(factual|juridical)$",
                "message": "Ошибка формата адреса, поле type"
            }
        }
    ]
};

module.exports = validateMap;
