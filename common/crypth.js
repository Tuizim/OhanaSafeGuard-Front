// Função para criptografar uma mensagem
function deriveKeyFromPassword(password) {
    // Converter a string "2303" em bytes
    const passwordBytes = aesjs.utils.utf8.toBytes(password);

    // Ajustar o comprimento para 16 bytes
    const key = new Uint8Array(16);
    
    // Copiar os bytes da senha para o array de 16 bytes
    for (let i = 0; i < key.length; i++) {
        key[i] = passwordBytes[i % passwordBytes.length];
    }

    return key;
}

function encryptMessage(message, key) {
    // Converter a mensagem em bytes
    const textBytes = aesjs.utils.utf8.toBytes(message);

    // A chave deve ter 16, 24 ou 32 bytes (128, 192 ou 256 bits)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

    // Criptografar a mensagem
    const encryptedBytes = aesCtr.encrypt(textBytes);

    // Converter os bytes criptografados para um formato legível (hexadecimal)
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    return encryptedHex;
}

// Função para descriptografar uma mensagem
function decryptMessage(encryptedHex, key) {
    // Converter a mensagem criptografada de volta para bytes
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // A chave deve ser a mesma usada na criptografia
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

    // Descriptografar os bytes
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Converter os bytes descriptografados de volta para texto
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return decryptedText;
}
