# BW POTLUCK 10/2021 BACKEND 
## Author Rick Mansfield 
- Full Stack Web Dev & Computer Science Engineer 
- [My Portfolio Link](https://rickmansfield.github.io/PortfolioWRM2021v2/)
## [GO TO THE LIVE SITE](https://front-end-git-styling-add-view-events-37a717-potluck-planner-8.vercel.app/)
![image](https://barelyadventist.com/wp-content/uploads/2019/01/potluck-clipart-dish-chinese-5.jpg)


- [BW POTLUCK 10/2021 BACKEND](#bw-potluck-102021-backend)
  - [Author Rick Mansfield](#author-rick-mansfield)
  - [GO TO THE LIVE SITE](#go-to-the-live-site)
  - [NOTE of IMPROVEMENT...](#note-of-improvement)
  - [Base URL](#base-url)
  - [----------------  ENDPOINTS  --------------------](#------------------endpoints----------------------)
  - [**-----LOGIN and REGISTER-----**](#-----login-and-register-----)
    - [[POST] /api/auth/register  -- creates a new user](#post-apiauthregister-----creates-a-new-user)
    - [[POST] /api/auth/login  -- logs in an existing user](#post-apiauthlogin-----logs-in-an-existing-user)
  - [**-----USERS-----**](#-----users-----)
    - [[GET] /api/users  -- gets list of users](#get-apiusers-----gets-list-of-users)
    - [[GET] /api/users/:id  -- gets user by ID](#get-apiusersid-----gets-user-by-id)
    - [[GET] /api/users/:id/potlucks  -- gets all the potlucks a user has been invited to](#get-apiusersidpotlucks-----gets-all-the-potlucks-a-user-has-been-invited-to)
    - [[GET] /api/users/:organizer_id/organizer_potlucks  -- gets all the potlucks a user has created](#get-apiusersorganizer_idorganizer_potlucks-----gets-all-the-potlucks-a-user-has-created)
    - [[PUT] /api/users/:id  -- edit existing user](#put-apiusersid-----edit-existing-user)
  - [**-----POTLUCKS-----**](#-----potlucks-----)
    - [[GET] /api/potlucks  -- get an array of potlucks](#get-apipotlucks-----get-an-array-of-potlucks)
    - [[GET] /api/potlucks/:id  -- gets potluck by ID](#get-apipotlucksid-----gets-potluck-by-id)
    - [[GET] /api/potlucks/:id/users  -- gets the users for a specific potluck](#get-apipotlucksidusers-----gets-the-users-for-a-specific-potluck)
    - [[GET] /api/potlucks/:id/foods  -- gets the foods for a specific potluck](#get-apipotlucksidfoods-----gets-the-foods-for-a-specific-potluck)
    - [[POST] /api/potlucks/:id/users  -- adds a user to a potluck](#post-apipotlucksidusers-----adds-a-user-to-a-potluck)
    - [[POST] /api/potlucks/:id/foods  -- adds a food item to a potluck](#post-apipotlucksidfoods-----adds-a-food-item-to-a-potluck)
    - [[POST] /api/potlucks  -- creates a new potluck](#post-apipotlucks-----creates-a-new-potluck)
    - [[PUT] /api/potlucks/:id  -- updates an existing potluck](#put-apipotlucksid-----updates-an-existing-potluck)
    - [[DELETE] /api/potlucks/:id  -- delete existing potluck](#delete-apipotlucksid-----delete-existing-potluck)
    - [[DELETE] /api/potlucks/:potluck_food_id/foods  -- delete existing food item in a potluck](#delete-apipotluckspotluck_food_idfoods-----delete-existing-food-item-in-a-potluck)
  - [**-----FOODS-----**](#-----foods-----)
    - [[GET] /api/foods  -- get an array of all foods](#get-apifoods-----get-an-array-of-all-foods)
    - [[GET] /api/foods/:id  -- gets food by ID](#get-apifoodsid-----gets-food-by-id)
    - [[POST] /api/foods  -- create new food item](#post-apifoods-----create-new-food-item)
    - [[PUT] /api/foods/:id  -- update existing food item](#put-apifoodsid-----update-existing-food-item)
    - [[DELETE] /api/foods/:id  -- delete existing food item](#delete-apifoodsid-----delete-existing-food-item)

## NOTE of IMPROVEMENT...
-thinking of doing this project yourself? Please notice that this was a Lambda School project. My solution is one of many possible. BEFORE you decide to use my solution know that it creates a single giant list that in it's present condition permits any user to update. In a real world app the project would need to be take father and prevent any user from updating the community foods list. 
## Base URL  
- https://bw-potluck-102021.herokuapp.com/



## ----------------  ENDPOINTS  -------------------- 

## **-----LOGIN and REGISTER-----**

### [POST] /api/auth/register  -- creates a new user

<details>
    <summary>WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string"
}
```
</details>

<details>
    <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "username": "string",
    "user_id": "integer"
}
```
</details>


### [POST] /api/auth/login  -- logs in an existing user
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "message": "Welcome back username",
    "user_id": "integer",
    "username": "username",
    "token": "TOKEN"
}
```
</details>

## **-----USERS-----**

### [GET] /api/users  -- gets list of users

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "user_id": 1,
        "username": "name1"
    },
    {
        "user_id": 2,
        "username": "name2"
    },
    {
        "user_id": 3,
        "username": "name3"
    }
]
```
</details>

### [GET] /api/users/:id  -- gets user by ID

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": 1,
    "username": "name1"
}
```
</details>

### [GET] /api/users/:id/potlucks  -- gets all the potlucks a user has been invited to 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "user_id": "1",
    "username": "name1",
    "potlucks": [
        {
            "attending": 1,
            "potluck_id": 3,
            "potluck_name": "PotLuck Name you Created",
            "organizer": "req.body of the name you submitted",
            "potluck_description": "the description of the potluck gathering",
            "potluck_date": "2021-10-28P06:00:00.000Z",
            "potluck_time": "08:30:00",
            "potluck_location": "1817 Some address you submitted, Wi. 53024"
        },
        {
            "attending": 1,
            "potluck_id": 2,
            "potluck_name": "Second PotLuck Name you Created",
            "organizer": "name2",
            "potluck_description": "description of the potluck gathering",
            "potluck_date": "2021-10-28P06:00:00.000Z",
            "potluck_time": "06:00:00",
            "potluck_location": "1234 Some other address you submitted, Wi. 53024"
        }
    ]
}
```
</details>

### [GET] /api/users/:organizer_id/organizer_potlucks  -- gets all the potlucks a user has created

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
[
    {
        "potluck_id": 3,
        "potluck_name": "PotLuck Name you Created",
        "organizer": 3,
        "details": {
            "potluck_description": "description of the potluck gathering",
            "potluck_date": "2021-10-28P06:00:00.000Z",
            "potluck_time": "08:30:00",
            "potluck_location": "1817 Some address you submitted, Wi. 53024"
        }
    },
    {
        "potluck_id": 2,
        "potluck_name": "Mansfield Family BBQ",
        "organizer": 3,
        "details": {
            "potluck_description": "Everything BBQ",
            "potluck_date": "2021-07-28T06:00:00.000Z",
            "potluck_time": "07:00:00",
            "potluck_location": "1234 Mansfield Street, Grafton, WI. 53024"
        }
    }
]
```
</details>


### [PUT] /api/users/:id  -- edit existing user
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "username": "string",
    "password": "string"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "user_id": 1,
    "username": "Mr. Blah"
}
```
</details>

## **-----POTLUCKS-----**

### [GET] /api/potlucks  -- get an array of potlucks

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
[
    {
        "potluck_id": 3,
        "potluck_name": "PotLuck Name you Created",
        "organizer": 3,
        "details": {
            "potluck_description": "description of the potluck gathering",
            "potluck_date": "2021-10-28P06:00:00.000Z",
            "potluck_time": "08:30:00",
            "potluck_location": "1817 Some address you submitted, Grafton Wi. 53024"
        }
    },
        {
        "potluck_id": 1,
        "potluck_name": "Smith Family Chineese Food Potluck",
        "organizer": 1,
        "potluck_description": "Just bring Oriental Foods",
        "potluck_date": "2021-08-20T06:00:00.000Z",
        "potluck_time": "05:00:00",
        "potluck_location": "3333 N ABC St, Grafton, WI. 53024 "
    },
    {
        "potluck_id": 2,
        "potluck_name": "Mansfield Family BBQ",
        "organizer": 3,
        "details": {
            "potluck_description": "Everything BBQ",
            "potluck_date": "2021-07-28T06:00:00.000Z",
            "potluck_time": "07:00:00",
            "potluck_location": "1234 Mansfield Street, Grafton, WI. 53024"
        }
    }
]
```
</details>

### [GET] /api/potlucks/:id  -- gets potluck by ID

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "Some Cool Potluck String Name",
    "details": {
        "organizer": "Donald",
        "potluck_description": "Make the Potluck Great Again. LMAO",
        "potluck_date": "2021-10-28P06:00:00.000Z",
        "potluck_time": "07:30:00",
        "potluck_location": "1234 Mansfield Street, Grafton, WI. 53024"
    }
}
```
</details>

### [GET] /api/potlucks/:id/users  -- gets the users for a specific potluck 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "potluck_id": 2,
    "potluck_name": "Sting Name of the Potluck",
    "details": {
        "organizer": 1,
        "potluck_description": "String of req.body describing the potluck",
        "potluck_date": "2021-10-28P06:00:00.000Z",
        "potluck_time": "05:00:00",
        "potluck_location": "1234 Whateveryouwrote Street, Grafton, WI. 53024"
    },
    "users": [
        {
            "user_id": 4,
            "username": "Santa Klause",
            "attending": "attending"
        },
        {
            "user_id": 3,
            "username": "Ms. Klause",
            "attending": "not attending"
        }
    ]
}
```
</details>

### [GET] /api/potlucks/:id/foods  -- gets the foods for a specific potluck 

<details>
     <summary>WHAT YOU GET BACK</summary>

```JSON
{
    "potluck_id": 3,
    "foods": [
        {
            "food_id": 1,
            "food_name": "Ketchup",
            "food_description": "It's not ordinary ok?!"
        },
        {
            "food_id": 2,
            "food_name": "Fried Rice",
            "food_description": "Ok I cheated and picked it up at the grocery store"
        },
        {
            "food_id": 6,
            "food_name": "Penut Butter",
            "food_description": "chuncky not smooth"
        }
    ]
}
```
</details>

### [POST] /api/potlucks/:id/users  -- adds a user to a potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
   "potluck_id": 2,
   "user_id": 15,
   "attending": 1 //simple 1 for attending and 0 not-attending
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 2,
    "potluck_name": "Coming up with Names is getting old",
    "details": {
        "organizer": 1,
        "potluck_description": "Coming up with Descriptions is getting even older",
        "potluck_date": "2021-10-20P06:00:00.000Z",
        "potluck_time": "05:00:00",
        "potluck_location": "111 Another St. WI. 53024"
    },
    "users": [
        {
            "user_id": 4,
            "username": "Mr. User Name",
            "attending": "attending"
        },
        {
            "user_id": 3,
            "username": "Ms. User Name",
            "attending": "not attending"
        },
        {
            "user_id": 8,
            "username": "Tom Thumb",
            "attending": "attending"
        }
    ]
}
```
</details>

### [POST] /api/potlucks/:id/foods  -- adds a food item to a potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "potluck_id": 3,
    "food_id": 2
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "foods": [
        {
            "food_id": 1,
            "food_name": "Ketchup",
            "food_description": "It's not ordinary ok?!"
        },
        {
            "food_id": 2,
            "food_name": "Fried Rice",
            "food_description": "Ok I cheated and picked it up at the grocery store"
        },
        {
            "food_id": 6,
            "food_name": "Penut Butter",
            "food_description": "chuncky not smooth"
        }
    ]
}
```
</details>


### [POST] /api/potlucks  -- creates a new potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "potluck_name": "string",
    "potluck_description": "string optional ",
    "potluck_date": "2021-10-08  this format REQUIRED",
    "potluck_time": "12:00:00 this format REQUIRED",
    "potluck_location": "string",
    "organizer": "integer"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "Lambda Graduation Bash",
    "details": {
        "organizer": "Rick Mansfield",
        "potluck_description": "Celebrate Lambda Graduation",
        "potluck_date": "2022-01-2P06:00:00.000Z",
        "potluck_time": "06:30:00",
        "potluck_location": "3214 Party House Way, Graftong WI. 53024"
    }
}
```
</details>

### [PUT] /api/potlucks/:id  -- updates an existing potluck
<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "potluck_name": "string",
    "potluck_description": "string optional ",
    "potluck_date": "2021-07-28  this format REQUIRED",
    "potluck_time": "12:00:00 this format REQUIRED",
    "potluck_location": "string",
    "organizer": "integer"

}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "Lambda Graduation Bash",
    "details":  {
        "organizer": "Rick Mansfield",
        "potluck_description": "Celebrate Lambda Graduation",
        "potluck_date": "2022-01-2P06:00:00.000Z",
        "potluck_time": "06:30:00",
        "potluck_location": "3214 Party House Way, Graftong WI. 53024"
    }
}
```
</details>




### [DELETE] /api/potlucks/:id  -- delete existing potluck

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "potluck_id": 3,
    "potluck_name": "Lambda Graduation Bash",
    "details":  {
        "organizer": "Rick Mansfield",
        "potluck_description": "Celebrate Lambda Graduation",
        "potluck_date": "2022-01-2P06:00:00.000Z",
        "potluck_time": "06:30:00",
        "potluck_location": "3214 Party House Way, Graftong WI. 53024"
    }
}
```
</details>

### [DELETE] /api/potlucks/:potluck_food_id/foods  -- delete existing food item in a potluck

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
"successfully removed item"
```
</details>

## **-----FOODS-----**

### [GET] /api/foods  -- get an array of all foods

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
[
    {
        "food_id": 1,
        "food_name": "Ketchup",
        "food_description": "It's not ordinary ok?!"
    },
    {
        "food_id": 2,
        "food_name": "Fried Rice",
        "food_description": "Ok I cheated and picked it up at the grocery store"
    },
    {
        "food_id": 6,
        "food_name": "Penut Butter",
        "food_description": "chuncky not smooth"
    }
]
```
</details>

### [GET] /api/foods/:id  -- gets food by ID

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 1,
    "food_name": "Ketchup",
    "food_description": "It's not ordinary ok?!"
}
```
</details>

### [POST] /api/foods  -- create new food item

<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "food_name": "Chips",
    "food_description": "string optional"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 8,
    "food_name": "Chips",
    "food_description": "description submitted"
}
```
</details>

### [PUT] /api/foods/:id  -- update existing food item

<details>
    <summary> WHAT TO SEND </summary>

```JSON
{
    "food_name": "Pickles",
    "food_description": "string optional"
}
```
</details>
<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 8,
    "food_name": "Pickles",
    "food_description": "description if you subbitted one"
}
```
</details>

### [DELETE] /api/foods/:id  -- delete existing food item

<details>
    <summary> WHAT YOU GET BACK </summary>

```JSON
{
    "food_id": 8,
    "food_name": "Name of the deleted food",
    "food_description": "description if one was submitted"
}
```
</details>