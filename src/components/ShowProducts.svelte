<script>
    import { products } from "$lib/store.js";

    let productsData= [];

    products.subscribe(value => productsData= value);
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
                <td>Edit Hide Delete</td>
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
