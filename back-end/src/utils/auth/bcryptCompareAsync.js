import bcrypt from 'bcrypt';

export const compareAsync = async (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
    );
}