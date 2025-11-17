# Route Handler for Book Loan Data

**Base URL** : `http://localhost:8080/api/book-loans/`  

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
  "details": ""
}
```

Code - 403 :

```JSON
{
  "success": false,
  "error": "Forbidden",
  "details": ""
}
```

Code - 500 :

```JSON
{
  "success": false,
  "error": "Something went wrong, please try again later.",
  "details": ""
}
```

## Get Paginated List

Method : `GET`  
Path : `/`  
Query :  

- page -> int, default 0; `0`
- limit -> int, default 10; `10`
- search -> string, default ''; `<bookIsbn | bookTitle | memberName>`
- searchFields -> string, (delimiter only with ','), default ''; `col1,col2,col3`
- filterFields -> string, (delimiter only with ','), default 'status'; `status, returned_date`
- filter -> string, (delimiter per fields only with '\\' ), default ''; `all|on_loaned|complete \ all|2020-05-01_2020-06-10`
- orderBy -> string, default 'updated_at'; `updated_at`
- orderDir  -> string, default 'desc'; `desc`

Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Book on Loan paginated-list successfully retrieved.",
  "data": [
    {
      "id": 1,
      "member": {
        "id": 1,
        "fullName": "Queen",
        "email": "queen@gmail.com",
        "phone": "085294214950",
        "address": "Gedung Sate, Jalan Diponegoro, Citarum, Kota Bandung, Jawa Barat",
        "birthDate": "1999-10-01",
        "gender": "f",
        "createdAt": "2025-06-02 08:05:20.000",
        "updatedAt": "2025-06-02 08:05:20.000",
      },
      "book": {
        "id": 1,
        "isbn": "9786231648303",
        "title": "Arsitektur Rumah Jawa",
        "subTitle": "Mengungkap Filosofi Makna dan Simbologinya",
        "publisher": "Anak Hebat Indonesia",
        "publicationDate": "2024-06-18",
        "page": 230,
        "language": "Indonesia",
        "edition": 1,
        "bookAuthors": [
          {
            "author": {
              "id": 21,
              "fullName": "Cahyadi",
              "country": {
                "code": "id",
                "name": "indonesia"
              },
              "about": "",
              "activeSince": 2005,
              "createdAt": "",
              "updatedAt": "",
            },
            "createdAt": "2025-06-01 08:00:20.000",
            "updatedAt": "2025-06-01 08:00:20.000"  
          }
        ],
        "bookImage": {
          "data": [
            {
              "id": 1,
              "fileName": "image1",
              "extension": "png",
              "sizeKilobyte": 1000,
              "createdAt": "2025-06-01 08:05:20.000",
              "updatedAt": "2025-06-01 08:05:20.000"  
            },
            {
              "id": 2,
              "fileName": "image2",
              "extension": "png",
              "sizeKilobyte": 1200,
              "createdAt": "2025-06-01 08:05:20.000",
              "updatedAt": "2025-06-01 08:05:20.000"  
            },
          ],
          "meta": {
            "baseUrl": "http://localhost:1000/",
            "urls": [
              "http://localhost:1000/image1.png",
              "http://localhost:1000/image2.png"
            ]
          }
        },
        "createdAt": "2025-06-01 08:05:20.000",
        "updatedAt": "2025-06-01 08:05:20.000"  
      },
      "startDate": "",
      "endDate": "",
      "returnedDate": "",
      "isReturned": "",
      "violations": [],
      "createdAt": "2025-06-01 08:05:20.000",
      "updatedAt": "2025-06-01 08:05:20.000" 
    }
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
  "message": "Book Loan successfully retrieved, id: <book_loan_id>",
  "data": {
    "id": 1,
    "status": "on Loan | complete",
    "member": {
      "id": 1,
      "fullName": "Queen",
      "email": "queen@gmail.com",
      "phone": "085294214950",
      "address": "Gedung Sate, Jalan Diponegoro, Citarum, Kota Bandung, Jawa Barat",
      "birthDate": "1999-10-01",
      "gender": "f",
      "createdAt": "2025-06-02 08:05:20.000",
      "updatedAt": "2025-06-02 08:05:20.000",
    },
    "book": {
      "id": 1,
      "isbn": "9786231648303",
      "title": "Arsitektur Rumah Jawa",
      "subTitle": "Mengungkap Filosofi Makna dan Simbologinya",
      "publisher": "Anak Hebat Indonesia",
      "publicationDate": "2024-06-18",
      "page": 230,
      "language": "Indonesia",
      "edition": 1,
      "bookAuthors": [
        {
          "author": {
            "id": 21,
            "fullName": "Cahyadi",
            "country": {
              "code": "id",
              "name": "indonesia"
            },
            "about": "",
            "activeSince": 2005,
            "createdAt": "",
            "updatedAt": "",
          },
          "createdAt": "2025-06-01 08:00:20.000",
          "updatedAt": "2025-06-01 08:00:20.000"  
        }
      ],
      "bookImage": {
        "data": [
          {
            "id": 1,
            "fileName": "image1",
            "extension": "png",
            "sizeKilobyte": 1000,
            "createdAt": "2025-06-01 08:05:20.000",
            "updatedAt": "2025-06-01 08:05:20.000"  
          },
          {
            "id": 2,
            "fileName": "image2",
            "extension": "png",
            "sizeKilobyte": 1200,
            "createdAt": "2025-06-01 08:05:20.000",
            "updatedAt": "2025-06-01 08:05:20.000"  
          },
        ],
        "meta": {
          "baseUrl": "http://localhost:1000/",
          "urls": [
            "http://localhost:1000/image1.png",
            "http://localhost:1000/image2.png"
          ]
        }
      },
      "createdAt": "2025-06-01 08:05:20.000",
      "updatedAt": "2025-06-01 08:05:20.000"  
    },
    "startDate": "",
    "endDate": "",
    "returnedDate": "",
    "isReturned": "",
    "violations": [],
    "createdAt": "2025-06-01 08:05:20.000",
    "updatedAt": "2025-06-01 08:05:20.000"  
  }
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book loan id is not found.",
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
  "bookId": 1, // int not null
  "memberId": 1, // int not null
  "startDate": "", // string timestamp not null
  "endDate": "", // string timestamp not null, cannot less than startDate and cannot less or more than the loan duration
}
```

---

**Response - Success** `201` :

```JSON
{
  "success": true,
  "message": "Book Loan successfully created",
  "data": {
    "member": {
      "id": 1,
      "fullName": "Queen",
      // other properties ....
    },
    "book": {
      "id": 1,
      "isbn": "9786231648303",
      "title": "Arsitektur Rumah Jawa",
      // other properties ....
    },
    "startDate": "",
    "endDate": "",
    "returnedDate": "",
    "isReturned": "",
    "violations": [],
    "createdAt": "2025-06-01 08:05:20.000",
    "updatedAt": "2025-06-01 08:05:20.000"  
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

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book id is not found.",
  "details": []
}
```

## Completed Loan

Method : `PUT`  
Path : `/{id}/completes`  
Query : `none`  
Body :  

```JSON
{
  "returnedDate": "", // string timestamp not null, empty, cannot less than startDate
  "violations": [], // array can be empty
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Book Loan successfully completed, id: <book_loan_id>",
  "data": {
    "id": 1,
    "member": {
      "id": 1,
      "fullName": "Queen",
      "email": "queen@gmail.com",
      "phone": "085294214950",
      "address": "Gedung Sate, Jalan Diponegoro, Citarum, Kota Bandung, Jawa Barat",
      "birthDate": "1999-10-01",
      "gender": "f",
      "createdAt": "2025-06-02 08:05:20.000",
      "updatedAt": "2025-06-02 08:05:20.000",
    },
    "book": {
      "id": 1,
      "isbn": "9786231648303",
      "title": "Arsitektur Rumah Jawa",
      "subTitle": "Mengungkap Filosofi Makna dan Simbologinya",
      "publisher": "Anak Hebat Indonesia",
      "publicationDate": "2024-06-18",
      "page": 230,
      "language": "Indonesia",
      "edition": 1,
      "bookAuthors": [
        {
          "author": {
            "id": 21,
            "fullName": "Cahyadi",
            "country": {
              "code": "id",
              "name": "indonesia"
            },
            "about": "",
            "activeSince": 2005,
            "createdAt": "",
            "updatedAt": "",
          },
          "createdAt": "2025-06-01 08:00:20.000",
          "updatedAt": "2025-06-01 08:00:20.000"  
        }
      ],
      "bookImage": {
        "data": [
          {
            "id": 1,
            "fileName": "image1",
            "extension": "png",
            "sizeKilobyte": 1000,
            "createdAt": "2025-06-01 08:05:20.000",
            "updatedAt": "2025-06-01 08:05:20.000"  
          },
          {
            "id": 2,
            "fileName": "image2",
            "extension": "png",
            "sizeKilobyte": 1200,
            "createdAt": "2025-06-01 08:05:20.000",
            "updatedAt": "2025-06-01 08:05:20.000"  
          },
        ],
        "meta": {
          "baseUrl": "http://localhost:1000/",
          "urls": [
            "http://localhost:1000/image1.png",
            "http://localhost:1000/image2.png"
          ]
        }
      },
      "createdAt": "2025-06-01 08:05:20.000",
      "updatedAt": "2025-06-01 08:05:20.000"  
    },
    "startDate": "",
    "endDate": "",
    "returnedDate": "",
    "isReturned": "",
    "violations": [],
    "createdAt": "2025-06-01 08:05:20.000",
    "updatedAt": "2025-06-01 08:05:20.000"  
  }
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book loan id is not found.",
  "details": []
}
```

## Update

Method : `PUT`  
Path : `/{id}`  
Query : `none`  
Body :  

```JSON
{
  "bookId": 1, // int not null
  "memberId": 1, // int not null
  "startDate": "", // string timestamp not null
  "endDate": "", // string timestamp not null, cannot less than startDate and cannot less or more than the loan duration
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Book Loan successfully updated, id: <book_loan_id>",
  "data": {
    "member": {
      "id": 1,
      "fullName": "Queen",
      // other properties ....
    },
    "book": {
      "id": 1,
      "isbn": "9786231648303",
      "title": "Arsitektur Rumah Jawa",
      // other properties ....
    },
    "startDate": "",
    "endDate": "",
    "returnedDate": "",
    "isReturned": "",
    "violations": [],
    "createdAt": "2025-06-01 08:05:20.000",
    "updatedAt": "2025-06-01 08:05:20.000"  
  }
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book loan id is not found.",
  "details": []
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book id is not found.",
  "details": []
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
  "message": "Book Loan successfully deleted, id: <book_loan_id>",
  "data": null
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book loan id is not found.",
  "details": []
}
```

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "Failed to remove Book Loan, id: <book_loan_id>. Please try again later",
  "details": []
}
```

## Get All Book Loan Data As File (xlsx)

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
