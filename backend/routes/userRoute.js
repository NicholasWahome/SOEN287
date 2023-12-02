
app.post('/signup', async (req, res) => {
    try {
        const { name, last_name, email, password, address, account_type } = req.body;

        // const connection = await oracledb.getConnection(dbConfig);

        // const result = await connection.execute(
        //     `INSERT INTO users (name, last_name, email, password, address, account_type) VALUES (:name, :last_name, :email, :password, :address, :account_type)`,
        //     [name, last_name, email, password, address, account_type],
        //     { autoCommit: true }
        // );

        // connection.close();

        res.status(200).json({ success: true, message: `Account created successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});