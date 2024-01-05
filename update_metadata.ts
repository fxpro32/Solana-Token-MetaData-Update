// #####################################################################
// ############### SOLANA TOKEN METADATA UPDATER SCRIPT ################
// #################### Copyright 2024 - FXPRO32 #######################
// #####################################################################
// ######### UPDATE TOKEN METADATA DIRECT TO SOLANA MAINNET ############
// #####################################################################
// ################# You are free to use this script####################
// ############## No warranties are implied whatsoever #################
// ######################### GNU3.0 License ############################
// #####################################################################
// #####################################################################
// #                                                                   #
// #        CURRENTLY BROKEN - SEEKING HELP FROM OTHER DEVS            #
// #                            DO NOT USE                             #
// #                                                                   #
// #####################################################################
// #####################################################################
// #####################################################################

// Initialize
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metadata, updateMetadata, createUpdateMetadataInstruction, DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import * as fs from 'fs';

// Replace these with your values
const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";  //MAKE SURE TO UPDATE THIS
const METADATA_ACCOUNT_ADDRESS = "YOUR-ACCOUNT-ADDRESS-WHERE-IT-HOLDS-YOUR-MINT-ADDRESS-TOKENS"; //MAKE SURE TO UPDATE THIS
const MINT_ADDRESS = "YOUR-MINT-TOKEN-ADDRESS-PUBLIC-KEY"; //MAKE SURE TO UPDATE THIS
const SECRET_KEY_PATH = '/PATH/TO/YOUR/PRIVATE/KEYS/SOLANA/ID.JSON'; //MAKE SURE TO UPDATE THIS

// Read secret key for the update authority
const secretKeyString = fs.readFileSync(SECRET_KEY_PATH, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const updateAuthorityKeypair = Keypair.fromSecretKey(secretKey);

// Connect to Solana
const connection = new Connection(RPC_ENDPOINT);

// New metadata details
const NEW_METADATA = new DataV2({
    name: "NAME-OF-YOUR-TOKEN", //MAKE SURE TO UPDATE THIS
    symbol: "SYMBOL-OF-YOUR-TOKEN", //MAKE SURE TO UPDATE THIS
    uri: "URL-OF-YOUR-METADATA-JSON-FILE-UPLOADED-TO-PUBLIC-SITE-SUCH-AS-PINATA", //MAKE SURE TO UPDATE THIS
    // ... other metadata fields ...
    // sellerFeeBasisPoints: 500, // Example value
    // creators: null // Example, update as needed
});

async function updateMetadata() {
    const mintPublicKey = new PublicKey(MINT_ADDRESS);
    const metadataPDA = await Metadata.getPDA(mintPublicKey);
    const metadataAccount = await Metadata.load(connection, metadataPDA);

    const instruction = createUpdateMetadataInstruction({
        metadata: metadataPDA,
        updateAuthority: updateAuthorityKeypair.publicKey
    }, { updateMetadataData: { data: NEW_METADATA, updateAuthority: updateAuthorityKeypair.publicKey, primarySaleHappened: null } });

    const transaction = new Transaction().add(instruction);
    transaction.feePayer = updateAuthorityKeypair.publicKey;
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

    const signedTransaction = await updateAuthorityKeypair.signTransaction(transaction);
    const transactionId = await connection.sendRawTransaction(signedTransaction.serialize());
    await connection.confirmTransaction(transactionId);

    console.log("Metadata updated successfully. Transaction ID:", transactionId);
}

updateMetadata()
    .then(() => console.log("Metadata update process completed."))
    .catch((error) => console.error("Error updating metadata:", error));
