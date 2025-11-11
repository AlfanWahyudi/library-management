# Route Handler for Violation Data

**Base URL** : `http://localhost:8080/api/violations/`  

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
- search -> string, default ''; `<violationName>`
- searchFields -> string, (delimiter only with ','), default ''; `col1,col2,col3`
- filterFields -> string, (delimiter only with ','), default 'level'; `level`
- filter -> string, (delimiter per fields only with '\\' ), default 'all'; `all|minor|moderate|high`
- orderBy -> string, default 'updated_at'; `updated_at`
- orderDir  -> string, default 'desc'; `desc`

Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Violation paginated-list successfully retrieved.",
  "data": [
    {
      "id": 1,
      "title": "Terlambat mengembalikan buku lebih dari 7 hari",
      "level": "minor",
      "description": null,
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
  "message": "Violation successfully updated, id: <violation_id>",
  "data": {
    "id": 1,
    "title": "Terlambat mengembalikan buku lebih dari 7 hari",
    "level": "minor",
    "description": null,
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
  "error": "violation id is not found.",
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
  "title": "Merusak buku kondisi ringan", // string not null, not empty
  "level": "minor", // string not null, not empty, only (moderate, minor, high)
  "description": null // string nullable
}
```

---

**Response - Success** `201` :

```JSON
{
  "success": true,
  "message": "Violation successfully created",
  "data": {
    "id": 2,
    "title": "Merusak buku kondisi ringan",
    "level": "minor",
    "description": null,
    "createdAt": "2025-06-02 08:05:20.000",
    "updatedAt": "2025-06-02 08:05:20.000"  
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
  "title": "Merusak buku kondisi ringan", // string not null, not empty
  "level": "minor", // string not null, not empty, only (moderate, minor, high)
  "description": "Merusak buku dengan kondisi kerusakan ringan. Seperti buku basah, sobek, dicoret-coret" // string nullable
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "Violation successfully updated, id: <violation_id>",
  "data": {
    "id": 2,
    "title": "Merusak buku kondisi ringan",
    "level": "minor",
    "description": "Merusak buku dengan kondisi kerusakan ringan. Seperti buku basah, sobek, dicoret-coret",
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
  "error": "violation id is not found.",
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
  "message": "Violation successfully deleted, id: <violation_id>",
  "data": null
}
```

---

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "violation id is not found.",
  "details": []
}
```

**Response - Failed** `500` :

```JSON
{
  "success": false,
  "error": "Failed to remove violation, id: <violation_id>. Please try again later",
  "details": []
}
```
