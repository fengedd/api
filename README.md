# DotA 2 Toxic Player Web API

Backend web API built with Javascript, NodeJS, Express, Docker, Redis, PostgreSQL that takes a player ID and processes information about player's account history. 

## How it works
Given playerID, web service send's GET request to OpenDota and Stratz for player information and returns response with player's common aliases, estimated rank, toxic behavior, known peers.   

## Example

```json
PlayerID: 86745912 (Arteezy)

{  
   "id":"86745912",
   "name":"give me coffee im boss",
   "profileUrl":"https://steamcommunity.com/id/77777Il77777i1li1IlIl71IlIlIl/",
   "avatarFull":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4c/4c237d7457dd3266bc8477eb6cb486af95777018_full.jpg",
   "firstMatchDate":1351293085,
   "isAnonymous":false,
   "names":[  
      {  
         "name":"rtz YB`a",
         "count":67
      },
      {  
         "name":"rtz",
         "count":36
      },
      {  
         "name":"a",
         "count":8
      },
      {  
         "name":"Arteezy",
         "count":7
      },
      {  
         "name":"REAL_LIFE",
         "count":6
      },
      {  
         "name":"bulba in romania pt 2",
         "count":4
      },
      {  
         "name":"rts",
         "count":4
      },
      {  
         "name":"send me location",
         "count":3
      },
      {  
         "name":"LIQUID`BULBA",
         "count":3
      },
      {  
         "name":"dasdasdasdasd f",
         "count":3
      }
   ],
   "playerStrength":{  
      "rank":80,
      "previousRank":75,
      "leaderBoardRank":4,
      "estimatedRank":{  
         "oneMonth":{  
            "estimatedRank":84,
            "estimatedIndividualRank":83
         },
         "sixMonths":{  
            "estimatedRank":84,
            "estimatedIndividualRank":81
         },
         "allTime":{  
            "estimatedRank":82,
            "estimatedIndividualRank":84
         }
      }
   },
   "toxic":{  
      "words":{  
         "profanity":{  
            "inappropriate":51,
            "sexual":125,
            "insult":12,
            "discriminatory":0,
            "blasphemy":0,
            "neutral":1967
         },
         "language":"eng"
      },
      "lowPrioGames":{  
         "oneMonth":{  
            "lowPrioGames":0,
            "jungleGames":0,
            "totalGames":28
         },
         "sixMonths":{  
            "lowPrioGames":0,
            "jungleGames":0,
            "totalGames":323
         },
         "allTime":{  
            "lowPrioGames":16,
            "jungleGames":28,
            "totalGames":7311
         }
      }
   },
   "peers":null
}

```

## License
[MIT](https://choosealicense.com/licenses/mit/)