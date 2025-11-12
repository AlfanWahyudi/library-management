# Route Handler for Book Data

**Base URL** : `http://localhost:8080/api/books/`  

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
- search -> string, default ''; `<isbn || title>`
- searchFields -> string, (delimiter only with ','), default ''; `col1,col2,col3`
- orderBy -> string, default 'updated_at'; `updated_at`
- orderDir  -> string, default 'desc'; `desc`

Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Book paginated-list successfully retrieved.",
  "data": [
    {
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
  "message": "Book successfully updated, id: <book_id>",
  "data": {
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
  }
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

## Create

Method : `POST`  
Path : `/`  
Query : `none`  
Body :  

```JSON
{
  "isbn": "9786020656151",
  "title": "Esensialisme",
  "subTitle": null,
  "publisher": null,
  "publicationDate": "2022-02-16",
  "page": null,
  "language": null,
  "edition": null,
  "authorIds": [21]
}
```

---

**Response - Success** `201` :

```JSON
{
  "success": true,
  "message": "Book successfully created",
  "data": {
    "id": 2,
    "isbn": "9786020656151",
    "title": "Esensialisme",
    "subTitle": null,
    "publisher": null,
    "publicationDate": "2022-02-16",
    "page": null,
    "language": null,
    "edition": null,
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
        "createdAt": "2025-06-02 08:00:20.000",
        "updatedAt": "2025-06-02 08:00:20.000"  
      }
    ],
    "createdAt": "2025-06-02 08:05:20.000",
    "updatedAt": "2025-06-02 08:05:20.000"  
  }
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "author id is not found.",
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
  "isbn": "9786020656151",
  "title": "Esensialisme",
  "subTitle": "Pentingkan yang penting saja",
  "publisher": "Gramedia Pustaka Utama",
  "publicationDate": "2022-02-16",
  "page": 354,
  "language": "Indonesia",
  "edition": 1,
  "authorIds": [21]
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Book successfully updated, id: <book_id>",
  "data": {
    "id": 2,
    "isbn": "9786020656151",
    "title": "Esensialisme",
    "subTitle": "Pentingkan yang penting saja",
    "publisher": "Gramedia Pustaka Utama",
    "publicationDate": "2022-02-16",
    "page": 354,
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
        "createdAt": "2025-06-02 08:00:20.000",
        "updatedAt": "2025-06-02 08:00:20.000"  
      }
    ],
    "createdAt": "2025-06-02 08:05:20.000",
    "updatedAt": "2025-06-03 08:05:20.000"  
  }
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

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "author id is not found.",
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
  "message": "Book successfully deleted, id: <book_id>",
  "data": null
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

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "Failed to remove book, id: <book_id>. Please try again later",
  "details": []
}
```

## Export All Book Data As File (xlsx)

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

## Create Book Images

Method : `POST`  
Path : `/{id}/images`  
Query : `none`  
Body :  

```JSON
{
  "files": ["binary1", "binary2"]
}
```

---

**Response - Success** `201` :

```JSON
{
  "success": true,
  "message": "Image files for book successfully saved.",
  "data": [
    {
      "id": 1,
      "bookId": 2,
      "fileName": "image1",
      "extension": "png",
      "sizeKilobyte": 1000,
      "createdAt": "2025-06-02 09:00:20.000",
      "updatedAt": "2025-06-02 09:00:20.000"  
    },
    {
      "id": 2,
      "bookId": 2,
      "fileName": "image2",
      "extension": "png",
      "sizeKilobyte": 1023,
      "createdAt": "2025-06-02 09:00:20.000",
      "updatedAt": "2025-06-02 09:00:20.000" 
    },
  ]
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

## Delete Book Image (force delete)

Method : `POST`  
Path : `/{id}/images/{fileId}`  
Query : `none`  
Body :  `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Book Image successfully deleted, id: <book_image_file_id>",
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "book image file id is not found.",
  "details": []
}
```
