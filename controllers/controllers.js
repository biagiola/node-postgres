const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'certina123',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
})

const getUsers = async (req, res) => {
  //const response = await pool.query('SELECT * FROM public.people ORDER BY id ASC')
  const response = await pool.query('SELECT * FROM people ORDER BY id ASC')
  console.log(response.rows)

  res.status(201).send(response.rows)
}

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id)
  const response = await pool.query('SELECT * FROM people WHERE id = $1', [id])
  res.status(201).json(response.rows)
}

const createUser = async (req, res) => {
  console.log('create user endpoint')

  const { name, phone, age, gender,  } = req.body;
  const response = await pool.query(`
    INSERT INTO people(fullname, phone, gender, age)
    VALUES ($1, $2, $3, $4)
  `, [name, phone, gender, age])

  res.status(201).json({
    message: '',
    body: {
      user: { name, phone, age, gender }
    }
  })
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, phone, age } = req.body

  const response = await pool.query(`
    UPDATE people 
    SET fullname = $2, phone = $3, age = $4 WHERE id = $1`,
    [id, name, phone, age]
  )

  res.status(201).json('User updated succesfully')
}

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id)
  
  const response = await pool.query(`DELETE FROM people WHERE id = $1`, [id])

  res.status(201).json(`User ${id} was deleted succesfully`)

}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}