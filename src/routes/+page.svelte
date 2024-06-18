<script>
    import AddProductForm from "../components/AddProductForm.svelte";
    import ShowProducts from "./../components/ShowProducts.svelte";

    import { products } from "$lib/store.js";

    let productsData= [];

    products.subscribe(value => productsData= value);
</script>

<div class="container">
    <AddProductForm />
    <ShowProducts />
</div>

<style>
</style>
