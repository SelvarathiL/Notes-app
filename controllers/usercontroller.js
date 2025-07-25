const ConnectDB = require('../db');

exports.signupuser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const db = await ConnectDB();

    await db.execute(
      'INSERT INTO users (name, password) VALUES (?, ?)',
      [name, password]
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Signup Error:', err);  // ✅ print actual error
    res.status(500).json({ message: 'Error during signup' });
  }
};


exports.loginuser = async (req, res) => {
  // const { name, password } = req.body;
  const name = req.body.name.trim();
  const password = req.body.password.trim();


  try {
    const db = await ConnectDB();

    const [results] = await db.execute(
      'SELECT * FROM users WHERE name = ? AND password = ?',
      [name, password]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = results[0];
    req.session.user = { id:user.id , name:user.name };
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};




exports.logoutuser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout Error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
