# Route Handler for Author Data

**Base URL** : `http://localhost:8080/api/authors/`  

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
- search -> string, default ''; `<authorName || country>`
- searchFields -> string, (delimiter only with ','), default ''; `col1,col2,col3`
- orderBy -> string, default 'updated_at'; `updated_at`
- orderDir  -> string, default 'desc'; `desc`

Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Author paginated-list successfully retrieved.",
  "data": [
    {
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
      "bookCount": 10
    },
    {
      "id": 22,
      "fullName": "Budi",
      "country": {
        "code": "id",
        "name": "indonesia"
      },
      "about": "",
      "activeSince": 2020,
      "createdAt": "",
      "updatedAt": "",
      "bookCount": 3
    },
  ],
  "meta": {
    "page": 0, // first page start from '0'
    "limit": 10, // limit data per page
    "dataCount": 2, // data with filtering
    "pageCount": 2, // total page
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
  "message": "Author successfully updated, id: <author_id>",
  "data": {
    "id": 25,
    "fullName": "jajang updated",
    "country": {
      "code": "id",
      "name": "indonesia"
    },
    "about": "",
    "activeSince": 2024,
    "createdAt": "",
    "updatedAt": "",
    "bookCount": 10
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

## Create

Method : `POST`  
Path : `/`  
Query : `none`  
Body :

```JSON
{
  "fullName": "jajang",
  "countryCode": "id",
  "activeSince": 2025,
  "about": null
}
```

---

**Response - Success** `201` :

```JSON
{
  "success": true,
  "message": "Author successfully created.",
  "data": {
    "id": 25,
    "fullName": "jajang",
    "country": {
      "code": "id",
      "name": "indonesia"
    },
    "about": "",
    "activeSince": 2025,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

---

>For failed response is same with the default from above.

## Update

Method : `PUT`  
Path : `/{id}`  
Query : `none`  
Body :

```JSON
{
  "fullName": "jajang updated",
  "countryCode": "id",
  "activeSince": 2024,
  "about": null
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Author successfully created.",
  "data": {
    "id": 25,
    "fullName": "jajang updated",
    "country": {
      "code": "id",
      "name": "indonesia"
    },
    "about": "",
    "activeSince": 2024,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

---

**Response - Failed** `500` :  

```JSON
{
  "success": false,
  "error": "author is not found.",
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
  "message": "Author successfully deleted, id: <author_id>",
  "data": null
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

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "Failed to remove author, id: <author_id>. Please try again later",
  "details": []
}
```

## Get Book List by Author ID

Method : `GET`  
Path : `/books/{id}`  
Query : `none`  
Body : `none`  

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "The list of books from the author_id <author_id>,  was successfully retrieved.",
  "data": [
    {
      "id": 0,
      "isbn": "3241312415",
      "title": "Book Title",
      //... other book data
    }
  ]
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "author id is not found.",
  "details": [

  ]
}
```

## Get All Author Data As File (xlsx)

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
