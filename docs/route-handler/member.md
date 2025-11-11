# Route Handler for Member

**Base URL** : `http://localhost:8080/api/members/`  

**Default Failed Response**  

Code - 400 :

```JSON
{
  "success": false,
  "error": "Validation failed.",
  "details": "zod_validation_details_format"
}
```

Code - 401 :

```JSON
{
  "success": false,
  "error": "Unauthorized",
  "details": []
}
```

Code - 403 :

```JSON
{
  "success": false,
  "error": "Forbidden",
  "details": []
}
```

Code - 500 :

```JSON
{
  "success": false,
  "error": "Something went wrong, please try again later.",
  "details": []
}
```

## Get Paginated List

Method : `GET`  
Path : `/`  
Query :  

- page -> int, default 0; `0`
- limit -> int, default 10; `10`
- search -> string, default ''; `<memberName>`
- searchFields -> string, (delimiter only with ','), default ''; `col1,col2,col3`
- filterFields -> string, (delimiter only with ','), default 'gender'; `gender`
- filter -> string, (delimiter per fields only with '\\' ), default 'all'; `all|m|f`
- orderBy -> string, default 'updated_at'; `updated_at`
- orderDir  -> string, default 'desc'; `desc`

Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Member paginated-list successfully retrieved.",
  "data": [
    {
      "id": 1,
      "fullName": "Queen",
      "email": "queen@gmail.com",
      "phone": "085294214950",
      "address": "Gedung Sate, Jalan Diponegoro, Citarum, Kota Bandung, Jawa Barat",
      "birthDate": "1999-10-01",
      "gender": "f",
      "bookLoan": {
        "inProgresses": [
          {
            "id": 1,
            "book": {
              "id": 10,
              "author": [
                {
                  "id": 1,
                  //...other author data
                }
              ],
              //...other book data
            },
            "startDate": "",
            "endDate": "",
            "returnedDate": "",
            "isReturned": true,
            "createdAt": "",
            "updatedAt": "",
          }
        ],
        "completes": [
          {
            "id": 1,
            "book": {
              "id": 10,
              "author": [
                {
                  "id": 1,
                  //...other author data
                }
              ],
              //...other book data
            },
            "startDate": "",
            "endDate": "",
            "returnedDate": "",
            "isReturned": true,
            "createdAt": "",
            "updatedAt": "",
          }
        ],
        "completedWithViolations": [
          {
            "id": 1,
            "book": {
              "id": 10,
              "author": [
                {
                  "id": 1,
                  //...other author data
                }
              ],
              //...other book data
            },
            "startDate": "",
            "endDate": "",
            "returnedDate": "",
            "isReturned": true,
            "createdAt": "",
            "updatedAt": "",
            "loanViolations": [
              {
                "violation": {
                  "id": 20,
                  "title": "",
                  "level": "",
                  "description": "",
                  "createdAt": "",
                  "updatedAt": "",
                },
                "createdAt": "",
                "updatedAt": "",
              }
            ]
          }
        ],
        "meta": {
          "inProgressCount": 1,
          "completedCount": 2,
          "completedWithViolationCount": 1,
          "completedTotal": 3,
        }
      },
      "createdAt": "2025-06-02 08:05:20.000",
      "updatedAt": "2025-06-02 08:05:20.000",
    },
    {
      "id": 2,
      "fullName": "King",
      "email": "king@gmail.com",
      "phone": "084313412910",
      "address": "Telkom Indonesia Graha Merah Putih Bandung",
      "birthDate": "1997-11-20",
      "gender": "m",
      "bookLoans": [],
      "createdAt": "2025-06-02 08:05:20.000",
      "updatedAt": "2025-06-02 08:05:20.000",
    },
  ],
  "meta": {
    "page": 0, // first page start from '0'
    "limit": 10, // limit data per page
    "dataCount": 2, // data with filtering
    "pageCount": 1, // total page
    "itemsCount": 2, // total data
  }
}
```

---

>For failed response is same with the default from above.

## Get By ID

Method : `GET`  
Path : `/{id}`  
Query : `none`  
Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Member successfully retrieved, id: <member_id>",
  "data": {
    "id": 1,
    "fullName": "Queen",
    "email": "queen@gmail.com",
    "phone": "085294214950",
    "address": "Gedung Sate, Jalan Diponegoro, Citarum, Kota Bandung, Jawa Barat",
    "birthDate": "1999-10-01",
    "gender": "f",
    "bookLoan": {
      "inProgresses": [
        {
          "id": 1,
          "book": {
            "id": 10,
            "author": [
              {
                "id": 1,
                //...other author data
              }
            ],
            //...other book data
          },
          "startDate": "",
          "endDate": "",
          "returnedDate": "",
          "isReturned": true,
          "createdAt": "",
          "updatedAt": "",
        }
      ],
      "completes": [
        {
          "id": 1,
          "book": {
            "id": 10,
            "author": [
              {
                "id": 1,
                //...other author data
              }
            ],
            //...other book data
          },
          "startDate": "",
          "endDate": "",
          "returnedDate": "",
          "isReturned": true,
          "createdAt": "",
          "updatedAt": "",
        }
      ],
      "completedWithViolations": [
        {
          "id": 1,
          "book": {
            "id": 10,
            "author": [
              {
                "id": 1,
                //...other author data
              }
            ],
            //...other book data
          },
          "startDate": "",
          "endDate": "",
          "returnedDate": "",
          "isReturned": true,
          "createdAt": "",
          "updatedAt": "",
          "loanViolations": [
            {
              "violation": {
                "id": 20,
                "title": "",
                "level": "",
                "description": "",
                "createdAt": "",
                "updatedAt": "",
              },
              "createdAt": "",
              "updatedAt": "",
            }
          ]
        }
      ],
      "meta": {
        "inProgressCount": 1,
        "completedCount": 2,
        "completedWithViolationCount": 1,
        "completedTotal": 3,
      }
    },
    "createdAt": "2025-06-02 08:05:20.000",
    "updatedAt": "2025-06-02 08:05:20.000",
  }
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "member id is not found.",
  "details": []
}
```

## Create

Method : `POST`  
Path : `/`  
Query : `none`  
Body :

```JSON
{
  "fullName": "Rock", // string not null, empty
  "email": "rock@gmail.com", // string not null, empty, email format
  "phone": "084524211929", // string not null, empty, only number
  "address": "Jl. Raya Sukaraja, RT.003/RW.003, Sukaraja, Kec. Sukaraja, Kabupaten Sukabumi, Jawa Barat 43192", // string not null, empty
  "birthDate": "1980-05-13", // string not null, empty, str_format_date "yyyy-mm-dd"
  "gender": "m" // string not null, empty, only "m or f"
}
```

---

**Response - Success** `201` :

```JSON
{
  "success": true,
  "message": "Member successfully created.",
  "data": {
    "id": 1,
    "fullName": "Rock",
    "email": "rock@gmail.com",
    "phone": "084524211929",
    "address": "Jl. Raya Sukaraja, RT.003/RW.003, Sukaraja, Kec. Sukaraja, Kabupaten Sukabumi, Jawa Barat 43192",
    "birthDate": "1980-05-13",
    "gender": "m",
    "createdAt": "2025-06-03 08:05:20.000",
    "updatedAt": "2025-06-03 08:05:20.000"
  }
}

```

## Update

Method : `PUT`  
Path : `/{id}`  
Query : `none`  
Body :

```JSON
{
  "fullName": "Rock Updated", // string not null, empty
  "email": "rockupdated@gmail.com", // string not null, empty, email format
  "phone": "084524211929", // string not null, empty, only number
  "address": "Jl. Raya Sukaraja, RT.003/RW.003, Sukaraja, Kec. Sukaraja, Kabupaten Sukabumi, Jawa Barat 43192", // string not null, empty
  "birthDate": "1980-05-15", // string not null, empty, str_format_date "yyyy-mm-dd"
  "gender": "m" // string not null, empty, only "m or f"
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Member successfully updated, id: <member_id>",
  "data": {
    "id": 1,
    "fullName": "Rock Updated",
    "email": "rockupdated@gmail.com",
    "phone": "084524211929",
    "address": "Jl. Raya Sukaraja, RT.003/RW.003, Sukaraja, Kec. Sukaraja, Kabupaten Sukabumi, Jawa Barat 43192",
    "birthDate": "1980-05-15",
    "gender": "m",
    "createdAt": "2025-06-03 08:05:20.000",
    "updatedAt": "2025-06-04 08:05:20.000"
  }
}

```

---

**Response - Failed** `500` :  

```JSON
{
  "success": false,
  "error": "member id is not found.",
  "details": []
}
```

## Delete (soft deleted)

Method : `DELETE`  
Path : `/{id}`  
Query : `none`  
Body : `none`  

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Member successfully deleted, id: <member_id>",
  "data": null
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "member id is not found.",
  "details": []
}
```

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "Failed to remove member, id: <member_id>. Please try again later",
  "details": []
}
```

## Export All Member Data As File (xlsx)

Method : `GET`  
Path : `/files`  
Query :  

- extension -> default 'xlsx'; `xlsx`

Body : `none`  

---

**Response - Success** `200` :

```JSON
(binary)
```
