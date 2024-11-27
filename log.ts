import Client, { CommitmentLevel, SubscribeRequest, SubscribeUpdate, SubscribeUpdateTransaction } from "@triton-one/yellowstone-grpc";

// QuickNode endpoints consist of two crucial components: the endpoint name and the corresponding token
// For eg: QN Endpoint: https://docs-demo.solana-mainnet.quiknode.pro/abcde123456789
// endpoint will be: docs-demo.solana-mainnet.quiknode.pro:10000  {10000 is the port number for gRPC}
// token will be : abcde123456789

const ENDPOINT = "YOUR_QN_ENDPOINT:10000";
const TOKEN = "YOUR_TOKEN_NUMBER";

async function main() {
    const client = new Client(ENDPOINT, TOKEN, {});

    const commitment = CommitmentLevel.CONFIRMED;

    try {
        const stream = await client.subscribe();

        // Set up error and end handlers
        stream.on("error", (error) => {
            console.error("Stream error:", error);
            stream.end();
        });

        stream.on("end", () => {
            console.log("Stream ended");
        });

        // Handle incoming data
        stream.on("data", (data: SubscribeUpdate) => {
            handleSubscribeUpdate(data);
        });

        // Create subscription request
        const request: SubscribeRequest = {
            slots: { client: { filterByCommitment: true } },
            transactions: {
                client: {
                    vote: false,
                    failed: false,
                    signature: undefined,
                    accountInclude: [],
                    accountExclude: [],
                    accountRequired: [],
                },
            },
            commitment: commitment,
            accounts: {},
            transactionsStatus: {},
            entry: {},
            blocks: {},
            blocksMeta: {},
            accountsDataSlice: [],
            ping: undefined,
        };

        // Send subscription request
        await new Promise<void>((resolve, reject) => {
            stream.write(request, (err: Error | null | undefined) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log("Subscription started. Waiting for events...");

        // Keep the script running
        await new Promise(() => {});

    } catch (error) {
        console.error("Error in subscription process:", error);
    }
}

function handleSubscribeUpdate(data: SubscribeUpdate) {
    if ("slot" in data) {
        console.log("Slot update:", data.slot);
    } else if ("transaction" in data) {
        const transaction = data.transaction as SubscribeUpdateTransaction;
        if (transaction && transaction.transaction) {
            console.log("Transaction update:", {
                signature: Buffer.from(transaction.transaction.signature).toString('base64'),
                slot: transaction.slot,
            });
        }
    } else {
        console.log("Other update:", data);
    }
}

main()
    .catch((err) => {
        console.error("Unhandled error:", err);
        process.exit(1);
    });