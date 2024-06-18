<script>
    import { products } from "$lib/store.js";

    let productsData= [],
        productData={
            name: "",
            price: 0,
            category: "",
            description: "",
            images: [],
            visible: true
        };

    products.subscribe(value => productsData= value);

    const handleSubmit= ()=>{
        if(productData.name && productData.price && productData.category){
            productsData.push(productData);
            productsData= [...productsData]

            products.set(productsData);

            productData= {
                name: "",
                price: 0,
                category: "",
                description: "",
                images: [],
                visible: true
            }

            console.log(productsData)
        }
    }
</script>

<div class="apf-container">
    <!-- <button class="add-product-btn">Add Product</button> -->
    <form class="add-product-form">
        <h2>Add a product</h2>
        <div class="inp-group">
            <label for="">Product name</label>
            <input bind:value={productData.name} type="text" placeholder="eg: Jai Ho Chamal" required>
        </div>
        <div class="inp-group">
            <label for="">Price (Rs.)</label>
            <input bind:value={productData.price} type="number" placeholder="eg: 2450" required>
        </div>
        <div class="inp-group">
            <label for="">Category</label>
            <input bind:value={productData.category} type="text" placeholder="eg: Rice" required>
        </div>
        <div class="inp-group">
            <label for="">Description</label>
            <textarea bind:value={productData.description}></textarea>
        </div>
        <div class="inp-group">
            <label for="">Upload image</label>
            <input type="file" required>
        </div>
        <button on:click={handleSubmit} class="add-btn" type="submit">Add</button>
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
    .inp-group{
        position: relative;
    }
    input, textarea{
        margin: .75rem 0;
        width: 400px;
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
