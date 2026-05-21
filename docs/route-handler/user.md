# Route Handler for User Data

**Base URL** : `http://localhost:8080/api/users/`  

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

## Get User By username

Method : `GET`  
Path : `/{username}`  
Query : `none`  
Body : `none`

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "User <username> successfully retrieved.",
  "data": {
    "id": 4,
    "username": "john123",
    "email": "john@gmail.com",
    "password": "password(hashed)",
    "fullName": "John",
    "address": "Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270",
    "gender": "m",
    "roles": [
      {
        "id": 3,
        "name": "Viewer",
        "permissions": [
          {
            "id": 4,
            "name": "view_member",
            "description": "Can view members"
          },
          {
            "id": 8,
            "name": "view_book",
            "description": "Can view books"
          },
          // ...other permission fore Viewer Role
        ],
        "createdAt": "2025-06-01 08:05:20.000",
        "updatedAt": "2025-06-01 08:05:20.000",
      }
    ],
    "createdAt": "2025-06-01 08:05:20.000",
    "updatedAt": "2025-06-01 08:05:20.000",
  }
}
```

---

**Response - Failed** `500` :

Error ini juga berfungsi untuk menyembunyikan data username lain, yang tidak sesuai dengan user credential login nya.

```JSON
{
  "success": false,
  "error": "username is not found.",
  "details": []
}
```

## Update

Method : `PUT`  
Path : `/{username}`  
Query : `none`  
Body :

```JSON
{
  "email": "johnupdated@gmail.com", // not null, empty; email format
  "fullName": "John Updated", // not null, empty
  "address": "Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270", // string nullable
  "gender": "m", // not null, empty; only (m, f)
}
```

---

**Response - Success** `200` :

```JSON
{
  "success": true,
  "message": "User <username> successfully updated.",
  "data": {
    "id": 4,
    "username": "john123",
    "email": "johnupdated@gmail.com",
    "password": "password(hashed)",
    "fullName": "John Updated",
    "address": "Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270",
    "gender": "m",
    "roles": [
      {
        "id": 3,
        "name": "Viewer",
        "permissions": [
          {
            "id": 4,
            "name": "view_member",
            "description": "Can view members"
          },
          {
            "id": 8,
            "name": "view_book",
            "description": "Can view books"
          },
          // ...other permission fore Viewer Role
        ],
        "createdAt": "2025-06-01 08:05:20.000",
        "updatedAt": "2025-06-01 08:05:20.000",
      }
    ],
    "createdAt": "2025-06-01 08:05:20.000",
    "updatedAt": "2025-06-02 08:05:20.000",
  }
}
```

---

**Response - Failed** `500` :  

Error ini juga berfungsi untuk menyembunyikan data username lain, yang tidak sesuai dengan user credential login nya.

```JSON
{
  "success": false,
  "error": "username is not found.",
  "details": []
}
```
