import React, {useState, useEffect } from "react";
import Web3modal from "web3modal";
import {ethers} from "ethers";

    //INTERNAL IMPORT
import Tracking from "../context/Tracking.json";

const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ContractABI =  Tracking.abi;

    //FETCH SMART CONTRACT
const fetchContract = (signerOrProvider) =>
        new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) =>
{
    const DappName = "Product Tracking Dapp";

    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) =>
    {
        console.log(items);
        const {receiver, pickupTime, distance, price} = items;

        try
        { if (!receiver) {
            console.error("Receiver is required");
            return;
        }
        if (!pickupTime || new Date(pickupTime).getTime() === NaN) {
            console.error("Invalid pickup time:", pickupTime);
            return;
        }
        if (isNaN(distance)) {
            console.error("Distance must be a number:", distance);
            return;
        }
        if (isNaN(price)) {
            console.error("Price must be a valid number:", price);
            return;
        }
            const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment
            (
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18)
                }

            );

            await createItem.wait();
            console.log(createItem);
        }
        catch(error)
        {
            console.log("Something went wrong",error);
        }
    };

    const getAllShipment = async()=>
    {
        try
        {
            const provider = new ethers.providers.JsonRpcProvider();
            //console.log(provider);
            const contract = fetchContract(provider);
            //console.log(contract);

            const Shipments = await contract.getAllTransactions();

            console.log(Shipments);

            const allShipments = Shipments.map
            (
                (Shipments)=>
                (
                    {
                        sender: Shipments.sender,
                        receiver: Shipments.receiver,
                        price: ethers.utils.formatEther(Shipments.price.toString()),
                        pickupTime: Shipments.pickupTime.toNumber(),
                        deliveryTime: Shipments.deliveryTime.toNumber(),
                        distance: Shipments.distance.toNumber(),
                        isPaid: Shipments.isPaid,
                        status: Shipments.status,
                    }
                )
            );

            return allShipments;
        }
        catch(error)
        {
            console.log("error, when getting shipment",error);
        }
    };


    const getShipmentsCount = async()=>
    {
        try
        {
            if(!window.ethereum) return "Install metamask";

            const accounts = await window.ethereum.request
            (
                {
                    method: "eth_accounts",
                }
            );

            const provider = new ethers.providers.JsonRpcProvider();

            const contract = fetchContract(provider);

            const shipmentsCount = await contract.getShipmentsCount(accounts[0]);

            return shipmentsCount.toNumber();
        }
        catch(error)
        {
            console.log("error when getting shipment - count");
        }
    };

    const completeShipment = async(completeShip)=>
    {
        console.log(completeShip);

        const {receiver, index} = completeShip;

        try
        {
            if(!window.ethereum) return "Install metamask";

            const accounts = await window.ethereum.request
            (
                {
                    method: "eth_accounts",
                }
            );

           const web3modal = new Web3Modal();
           const connection = await web3modal.connect();
           const provider = new ethers.providers.Web3Provider(connection);
           const signer = provider.getSigner();
           const contract = fetchContract(signer);

           const transaction = await contract.completeShipment
           (
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 300000,
                }
           );

           transaction.wait();
           console.log(transaction);
        }
        catch(error)
        {
            console.log("error, wrong completeShipment", error);
        }
    };

    const getShipment = async(index)=>
    {
        console.log(index*1);

        try
        {
            if(!window.ethereum) return "Install metamask";

            const accounts = await window.ethereum.request
            (
                {
                    method: "eth_accounts",
                }
            );

            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipment = await contract.getShipment(accounts[0], index*1);

            const singleShipment =
            {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            };

            return singleShipment;
        }
        catch(error)
        {
            console.log("error, sorry no shipment ");
        }
    };

    const startShipment = async(getProduct)=>
    {
        const {receiver, index} = getProduct;

        try
        {
            if(!window.ethereum) return "Install metamask";

            const accounts = await window.ethereum.request
            (
                {
                    method: "eth_accounts",
                }
            );

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment
            (
                accounts[0],
                receiver,
                index*1,

            );

            shipment.wait();
            console.log(shipment);
        }
        catch(error)
        {
            console.log("error, no shipment Sorry",error);
        }
    };

    //checking wallet connection
    const checkIfWalletConnected = async()=>
    {
        try
        {
            if(!window.ethereum) return "Install metamask";

            const accounts = await window.ethereum.request
            (
                {
                    method: "eth_accounts",
                }
            );

            if(accounts.length)
            {
                setCurrentUser(accounts[0]);
            }
            else
            {
                return "No account";
            }
        }
        catch(error)
        {
            return "Not connected";
        }
    };

        //Connect Wallet Function
    const connectWallet = async()=>
    {
        try
        {
            if(!window.ethereum) return "Install metamask";

            const accounts = await window.ethereum.request
            (
                {
                    method: "eth_requestAccounts",
                }
            );

            setCurrentUser(accounts[0]);
        }
        catch(error)
        {
            return "connection to wallet went wrong";
        }
    };

    useEffect
    (
        ()=>
        {
            checkIfWalletConnected();
        },[]
    );

    return    (
        <TrackingContext.Provider
            value=
            {
                {
                    connectWallet,
                    createShipment,
                    getAllShipment,
                    completeShipment,
                    getShipment,
                    startShipment,
                    getShipmentsCount,
                    DappName,
                    currentUser
                }
            }
        >
            {children}
        </TrackingContext.Provider>
    );
};