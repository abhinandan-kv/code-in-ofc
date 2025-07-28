import { fileURLToPath } from "url";
import connection from "../config/database.js";
import personTable from "../models/databaseModel.js";
import query from "../utils/query.js";
import statusCodes from "../utils/statusCode.js";
import { dirname, join } from "path";
import multer from "multer";

export function showAllTable(req, res) {
  connection.query(query.listAll, (err, result, field) => {
    if (err) {
      console.error("Query error", err);
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
    }
    console.log("field", field);
    console.log("result", result);
    res.json(result);
  });
}

export function createNewTable(req, res) {
  let tableName = req.params.tablename;
  let queryWithTableName = `${query.createNewTable} ${tableName} ${personTable}`;

  //console.log(queryWithTableName)

  connection.query(queryWithTableName, (error, result, fields) => {
    if (error) {
      console.error(error);
      res.status(statusCodes.ClientError.code).send(statusCodes.ClientError.msg);
    }
    console.log(result);
    console.log(fields);
    res.send(result);
  });
}

export function addNewRow(req, res) {
  connection.query(query.addNewRow, (err, result, field) => {
    if (err) {
      console.error("Query error", err);
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
    }
    console.log("field", field);
    console.log("results", result);
    res.json(result);
  });
}

export function addNewRowUser(req, res) {
  //let data = req.body;
  // console.log(typeof data)

  const { LastName, FirstName, Address, City, Country, Age } = req.body;

  //console.log(typeof LastName, FirstName, Address, City, Country, Age)

  if (
    typeof LastName !== "string" &&
    typeof FirstName !== "string" &&
    typeof Address !== "string" &&
    typeof City !== "string" &&
    typeof Country !== "string" &&
    typeof Age !== number
  ) {
    console.error(statusCodes.ClientError.code, statusCodes.ClientError.msgMissingField);
  } else {
    console.log("good getting all data perfectly");

    let queryWithUserValues = `${query.addNewRowInsert} Values('${LastName}', '${FirstName}' ,'${Address}' ,'${City}' ,'${Country}', ${Age})`;
    console.log(queryWithUserValues);

    connection.query(queryWithUserValues, (error, result, field) => {
      if (error) {
        console.error(error);
      }
      console.log(result);
      console.log(field);

      res.json(result);
    });
  }
}

export function patchRowField(req, res) {
  //   // const data = req.body
  //   // console.log(data)
  //   // console.log(data.key)

  //   //   const { Age } = req.body;
  //   //   console.log(Age);

  // //   let key = Object.keys(req.body);
  // //   console.log(key);

  // //   let data = Object.entries(req.body);
  // //   console.log(data);
  // //   console.log(data[0][1]);

  // //   //   let length = Object.keys(req.body).length
  // //   //   console.log(length)

  // //   let patchQuery = `${query.updateAField} SET ${data[0][0]}='${data[0][1]}' WHERE ${data[1][0]}='${data[1][1]}'`;
  // //   console.log(patchQuery);

  //   console.log(req.params)
  //   //    connection.query()

  let id = req.params.id;
  let key = req.params.key;
  let value = req.params.value;

  id = parseInt(id);

  console.log(typeof id, typeof key, typeof value);

  let patchQuery = `${query.updateAField} SET ${key}='${value}' WHERE PersonID=${id}`;

  connection.query(patchQuery, (err, result, field) => {
    if (err) {
      console.error("Query error", err);
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
    }
    console.log(result);
    console.log(field);
    res.json(result);
  });
}

export function dynamicPatchRowField(req, res) {
  const allowedParams = ["LastName", "FirstName", "Address", "City", "Country", "Age"];

  const { id, ...otherKeys } = req.body;

  // console.log(otherKeys);

  let keys = Object.keys(otherKeys).filter((key) => allowedParams.includes(key));
  //console.log(keys);

  const setClause = keys.map((key) => `${key}='${otherKeys[key]}'`).join(",");
  //console.log("setClause", setClause);

  // const values = keys.map(key=> otherKeys[key])
  // console.log(values)

  let dynamicPatchQuery = `${query.updateAField} SET ${setClause} WHERE PersonId=${id}`;
  console.log(dynamicPatchQuery);

  connection.query(dynamicPatchQuery, (error, result, field) => {
    if (error) {
      console.error(error);
      res.status(statusCodes.ClientError.code).send(statusCodes.ClientError.msg);
    } else {
      console.log(result);
      console.log(field);
      res.json(result);
    }
  });
}

export function deleteRowById(req, res) {
  const id = req.params.id;
  console.log(id);

  let deleteQueryWithId = `${query.deleteARow} personId=${id}`;

  connection.query(deleteQueryWithId, (err, result, fields) => {
    if (err) {
      console.error(err);
      res.status(statusCodes.ClientError.code).send(statusCodes.ClientError.msg);
    }
    console.log(result);
    console.log(fields);
    res.json(result);
  });
}

export function dropTable(req, res) {
  let tableName = req.params.tablename;

  //console.log(tableName)

  let deleteQueryWithTablename = `${query.dropTable} ${tableName}`;

  connection.query(deleteQueryWithTablename, (err, result, fields) => {
    if (err) {
      console.error(err);
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
    }
    console.log(result);
    console.log(fields);
    res.json(result);
  });
}

export function createTableWithCustomSchema(req, res) {
  let { id, ...otherFields } = req.body;
  let tableName = req.params.tablename;

  let keys = Object.keys(otherFields);

  const setClause = keys.map((key) => `${key} ${otherFields[key]}`).join(",");

  console.log(setClause);

  let queryWithSchema = `${query.createNewTable} ${tableName} (${setClause})`;
  console.log(queryWithSchema);

  connection.query(queryWithSchema, (err, result, fields) => {
    if (err) {
      console.error(err);
      res.status(statusCodes.ClientError.code).send(statusCodes.ClientError.msg);
    }
    console.log(result);
    console.log(fields);
    res.json(result);
  });
}

export function uploadFile(req, res) {
  // const __filename = fileURLToPath(import.meta.url)
  // const __dirname = dirname(__filename)
  // console.log(__dirname)

  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }       //~2MB
  });

  upload.single('File')(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const fileName = req.file.path;
    console.log(fileName);

    try {
      const [result] = await connection.promise().query(query.uploadFile, [fileName]);

      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
    }
  });

}


export function innerJoin(req, res) {
  connection.query(query.innerJoin, (err, result, fields) => {
    if (err) {
      console.error(err)
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg)
    }
    console.log(result)
    console.log(fields)
    res.json(result)
  })
}

export function leftJoin(req, res) {
  connection.query(query.leftJoin, (err, result, fields) => {
    if (err) {
      console.error(err)
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg)
    }
    console.log("length :-", Object.keys(result).length)
    res.json(result)
  })
}


export function rightJoin(req, res) {
  connection.query(query.rightJoin, (err, result, fields) => {
    if (err) {
      console.error(err)
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg)
    }
    console.log("length :-", Object.keys(result).length)
    res.json(result)
  })
}

export function crossJoin(_, res) {
  connection.query(query.crossJoin, (err, result, fields) => {
    if (err) {
      console.error(err)
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg)
    }
    res.json(result)
  })
}

export function selfJoin(_, res) {
  connection.query(query.selfJoin, (err, result) => {
    if (err) {
      console.error(err)
      res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg)
    }
    console.log("Length :-", Object.keys(result).length)
    res.json(result)
  })
}

export function fullJoin(_, res) {
  connection.query(query.fullJoin, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log("Length :-", Object.keys(result).length);
      res.json(result)
    }
  })
}

export function aggregateFn(req, res) {
  let fn = req.params.fn
  let col = req.params.col
  console.log(fn, col)
  let q = query.aggregateFn
  console.log(q)

  //METHOD 1
  // let qArr =  q.split("?")
  // console.log(qArr)
  // let str = qArr[0]  
  // console.log(str)
  // let str1 = str+`${fn}(${col})`
  // console.log(str1)

  // qArr.shift()
  // qArr.unshift(str1)
  // qArr = qArr.join("")
  // console.log("TYPE OF ",typeof qArr)
  // console.log(qArr)

  // METHOD 2
  let qArr = q.split("?")
  let joincd = `${fn}(${col})`
  qArr = qArr.join(joincd)
  console.log(qArr)

  let finalQuery = qArr.toLocaleString()
  // console.log(typeof finalQuery)

  connection.query(finalQuery , (err, result, fields)=>{
    if(err){
      console.error(err)
      res.send(err)
    }else{
      console.log(result)
      console.log(fields)
      res.json(result)
    }
  })
}


export function customAggregateFn(req, res) {
  let userQuery = req.body
  console.log(userQuery)
  connection.query(userQuery.query, (err, result, fields) => {
    if (err) {
      console.error(err)
      res.send(err)
    } else {
      console.log(result)
      console.log(fields)
      res.json(result)
    }
  })
}