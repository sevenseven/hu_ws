class SolWeb3Tools {
    
    constructor() {

        let secretKey = Uint8Array.from([105,119,236,163,210,205,18,2,73,169,152,210,44,206,222,178,86,240,70,73,216,160,158,227,121,160,217,236,64,216,252,186,116,11,43,164,63,90,104,214,73,48,44,106,30,177,246,116,91,35,56,151,243,104,125,249,180,163,156,52,36,167,207,214]);
        console.log(secretKey)
        this.programId = solanaWeb3.Keypair.fromSecretKey(secretKey).publicKey;

        this._network = solanaWeb3.clusterApiUrl('devnet');
        this._connection = new solanaWeb3.Connection(this._network, 'confirmed');

    };

    async verifyMateMask() {
        return await this.init_web3();
    };

    async init_web3() {
        if ("solana" in window) {

            this._provider = window.solana;
            if (this._provider.isPhantom) {
                try {
                    const res = await this._provider.connect();
                    console.log(JSON.stringify(res));
                    console.log(this._provider)
                    this.publicKey = res.publicKey;
                    // $(".connected-img").show();
                    // $(".connect-img").hide();
                    $("#pk").html(this.publicKey.toBase58())
                    return '1';
                } catch (err) {
                    console.warn(err);
                    console.log("Error: " + JSON.stringify(err));
                }
                return provider;
            }
        } else {
            window.open("https://phantom.app/", "_blank");
            return '0';
        }
        
    };

    getProvider = () => {
        const isPhantomInstalled = window.solana && window.solana.isPhantom
        console.log(isPhantomInstalled)
        if ("solana" in window) {
            const provider = window.solana;
            if (provider.isPhantom) {
            return provider;
            }
        }
        window.open("https://phantom.app/", "_blank");
    };
    
    Phantom = async () => {
        try {
            const res = await this._provider.connect();
            addLog(JSON.stringify(res));
        } catch (err) {
            console.warn(err);
        }
    };

    createTransaction = async (instruction) => {
        if (!this._provider.publicKey) {
            return;
        }
        let transaction = new solanaWeb3.Transaction().add(instruction);
        transaction.feePayer = this._provider.publicKey;
        console.log("Getting recent blockhash");
        let anyTransaction = transaction;
        anyTransaction.recentBlockhash = (
            await _connection.getRecentBlockhash()
        ).blockhash;
        return transaction;
    };

    initAccount = async () => {
        // Check if the program has been deployed
        let programInfo = await this._connection.getAccountInfo(this.programId);
        if (programInfo === null) {
          console.log('Program is not deployed');
        } else if (!programInfo.executable) {
          console.log('Program is not executable');
        }
        console.log('Using program ' + this.programId.toBase58());


        let HU_SEED = 'Huhu Tigers';
        this.initPubkey = await solanaWeb3.PublicKey.createWithSeed(
            this.publicKey,
            HU_SEED,
            this.programId,
        );
        // Check if the greeting account has already been created
        let initAccount = await this._connection.getAccountInfo(initPubkey);
        if (initAccount === null) {
            console.log( 'Creating account', initPubkey.toBase58(),  'to say hello to');
            
            // Get Minimum amount for rent exemption
            let lamports = await this._connection.getMinimumBalanceForRentExemption(
                solanaWeb3.NONCE_ACCOUNT_LENGTH,
            );
            let transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.createAccountWithSeed({
                    fromPubkey: this.publicKey,
                    basePubkey: this.publicKey,
                    seed: HU_SEED,
                    newAccountPubkey: initPubkey,
                    lamports,
                    programId: this.programId
                })
            );
            transaction.feePayer = this._provider.publicKey;
            console.log("Getting recent blockhash");
            const anyTransaction = transaction;
            anyTransaction.recentBlockhash = (
                await connection.getRecentBlockhash()
            ).blockhash;


            if (transaction) {
                try {
                    let signed = await this._provider.signTransaction(transaction);
                    console.log("Got signature, submitting transaction");
                    let signature = await connection.sendRawTransaction(signed.serialize());
                    console.log(
                    "Submitted transaction " + signature + ", awaiting confirmation"
                    );
                    await connection.confirmTransaction(signature);
                    console.log("Transaction " + signature + " confirmed");
                } catch (err) {
                    console.warn(err);
                    console.log("Error: " + JSON.stringify(err));
                }
            }

        } else {
            console.log(initAccount)
        }
    };

    testsol = async () => {
        try {
            let network = solanaWeb3.clusterApiUrl('devnet');
            console.log(network)
            let connection = new solanaWeb3.Connection(network, 'confirmed');
            console.log(connection)
            let slot = await connection.getSlot();
            console.log(slot);

            let blockTime = await connection.getBlockTime(slot);
            console.log(blockTime);

            let block = await connection.getBlock(slot);
            console.log(block);

            let nonceAccount = solanaWeb3.Keypair.generate();
            // Get Minimum amount for rent exemption
            let minimumAmount = await connection.getMinimumBalanceForRentExemption(
                solanaWeb3.NONCE_ACCOUNT_LENGTH,
            );

        } catch (err) {
            console.warn(err);
        }
    };

    initData = async () => {

        const instruction = new solanaWeb3.TransactionInstruction({
            keys: [{pubkey: this.initPubkey, isSigner: false, isWritable: true}],
            programId: this.programId,
            data: Buffer.alloc(0), // All instructions are hellos
          });

        let transaction = this.createTransaction(instruction)
        transaction.feePayer = this._provider.publicKey;
        console.log("Getting recent blockhash");
        const anyTransaction = transaction;
        anyTransaction.recentBlockhash = (
            await connection.getRecentBlockhash()
        ).blockhash;


        if (transaction) {
            try {
                let signed = await this._provider.signTransaction(transaction);
                console.log("Got signature, submitting transaction");
                let signature = await connection.sendRawTransaction(signed.serialize());
                console.log(
                "Submitted transaction " + signature + ", awaiting confirmation"
                );
                await connection.confirmTransaction(signature);
                console.log("Transaction " + signature + " confirmed");
            } catch (err) {
                console.warn(err);
                console.log("Error: " + JSON.stringify(err));
            }
        }
    }; 


    
}