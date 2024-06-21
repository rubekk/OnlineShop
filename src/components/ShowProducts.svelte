<script>
    import { products, editing } from "$lib/store.js";

    let productsData= [];

    products.subscribe(value => productsData= value);

    const handleEdit= pid=> editing.set({edit: true, pid});

    const handleHide= pid=> {
        let eIndex= productsData.findIndex(product => product.pid==pid);

        productsData[eIndex].visible= !productsData[eIndex].visible;
        products.set(productsData);
    }

    const handleDelete= pid=> {
        let eIndex= productsData.findIndex(product => product.pid==pid);

        productsData.splice(eIndex, 1);
        productsData= [...productsData];
        products.set(productsData);
    }
</script>

<div class="sp-container">
    <h2>List of products</h2>
    {#if productsData.length>0}
    <table>
        <thead>
            <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Modify</th>
            </tr>
        </thead>
        <tbody>
        {#each productsData as product, i}
            <tr>
                <td>{i+1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                    <i on:click={()=> handleEdit(product.pid)} class="fa-solid fa-pen-to-square"></i>
                    <i on:click={()=> handleHide(product.pid)} class="fa-solid fa-eye-slash"></i>
                    <i on:click={()=> handleDelete(product.pid)} class="fa-solid fa-trash"></i>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    {:else}
    No products to show
    {/if}
</div>

<style>
    .sp-container{
        margin: 1rem auto;
        padding: 1rem;
        width: max-content;
        background-color: #dcdcdc;
        border-radius: 3px;
    }
    .sp-container h2{
        margin-bottom: 1rem;
        text-align: center;
    }
    table{
        background-color: #fff;
        border-radius: 6px;
        border-collapse: collapse;
    }
    thead, tr:nth-child(2n) {
        background-color: #f9f9f9;
    }
    th, td{
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }
</style>
