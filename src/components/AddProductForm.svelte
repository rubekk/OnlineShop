<script>
    import { products, editing } from "$lib/store.js";
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, addDoc } from "firebase/firestore";
    import { firebaseConfig } from "$lib/firebaseConfig.js";

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app); 
    const colRef= collection(db, "products");

    let productsData= [],
        productData={
            pid: 0,
            name: "",
            price: "",
            discountedPrice: "",
            category: "",
            description: "",
            images: [],
            visible: true
        },
        editData= { edit: false, pid: 0 };

    products.subscribe(value => productsData= value);
    editing.subscribe(value => editData= value);

    const handleSubmit= ()=>{
        if(productData.name && productData.price && productData.category){
            productData.pid= Date.now();
            if(!productData.discountedPrice) productData.discountedPrice= productData.price;
            
            productData= Object.assign({
                pid: 0,
                name: "",
                price: "",
                discountedPrice: "",
                category: "",
                description: "",
                images: [],
                visible: true
            })
        }
    }

    const triggerEdit= ()=>{
        if(!editData.edit) return;

        productData= productsData.find(product =>{ return product.pid==editData.pid})
    }

    const handleEdit= ()=>{
        if(productData.name && productData.price && productData.category){
            let eIndex= productsData.findIndex(product => product.pid==editData.pid);

            productsData[eIndex]= productData;
            products.set(productsData);

            productData= Object.assign({
                pid: 0,
                name: "",
                price: 0,
                discountedPrice: 0,
                category: "",
                description: "",
                images: [],
                visible: true
            })

            editing.set({ edit: false, pid: 0 });
        }
    }

    $: editData && triggerEdit();
</script>

<div class="apf-container">
    <form class="add-product-form">
        <h2>Add a product</h2>
        <div class="inp-group">
            <label for="">Product name</label>
            <input bind:value={productData.name} type="text" placeholder="eg: Jai Ho Chamal">
        </div>
        <div class="inp-row">
            <div class="inp-group">
                <label for="">Price (Rs.)</label>
                <input bind:value={productData.price} type="number" placeholder="eg: 2450">
            </div>
            <div class="inp-group">
                <label for="">Discounted Price</label>
                <input bind:value={productData.price} type="number" placeholder="eg: 2450">
            </div>
        </div>
        <div class="inp-group">
            <label for="">Category</label>
            <input bind:value={productData.category} type="text" placeholder="eg: Rice">
        </div>
        <div class="inp-group">
            <label for="">Description</label>
            <textarea bind:value={productData.description}></textarea>
        </div>
        <div class="inp-group">
            <label for="">Upload image</label>
            <input type="file">
        </div>
        {#if editData.edit}
        <button on:click={handleEdit} class="add-btn" type="submit">Edit</button>
        {:else}
        <button on:click={handleSubmit} class="add-btn" type="submit">Add</button>
        {/if}
    </form>
</div>

<style>
    .add-product-form{
        margin: 1rem auto;
        padding: 1rem;
        width: max-content;
        background-color: #dcdcdc;
        border-radius: 3px;
    }
    .add-product-form h2{
        margin-bottom: 1rem;
        text-align: center;
    }
    .inp-row{
        display: flex;
    }
    .inp-group{
        width: 400px;
        position: relative;
    }
    .inp-row .inp-group{
        width: 50%;
    }
    .inp-row .inp-group:nth-child(1){
        margin-right: .5rem;
    }
    input, textarea{
        margin: .75rem 0;
        width: 100%;
        border-radius: 6px;
        line-height: 6ex;
        position: relative;
    }
    label{
        padding: 0 .25rem;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: -0.2rem;
        left: 1.5rem;
        z-index: 1;
    }
    textarea{
        height: 100px;
    }
    input[type=file]{
        padding: 1rem;
        height: 70px;
        background-color: #fff;
    }
    .add-btn{
        width: 100%;
    }
</style>
