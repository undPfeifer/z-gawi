<template>
    <section>
        <div class="grid__main">
            <h1>We reframe <br> in five <br> Worlds</h1>
            <img src="/img/uebermutter-1-corporate-small.gif" alt="">
        </div>

        <div class="world__overview-grid">
            <div class="world__overview-grid--content">
                <button class="btn">corporate</button>
                <p>Leaders and Managers — for example strategy acitivation</p>
            </div>
            <div class="world__overview-grid--content">
                <button class="btn">corporate</button>
                <p>Leaders and Managers — for example strategy acitivation</p>
            </div>
            <div class="world__overview-grid--content">
                <button class="btn">corporate</button>
                <p>Leaders and Managers — for example strategy acitivation</p>
            </div>
            <div class="world__overview-grid--content">
                <button class="btn">corporate</button>
                <p>Leaders and Managers — for example strategy acitivation</p>
            </div>
            <div class="world__overview-grid--content">
                <button class="btn">corporate</button>
                <p>Leaders and Managers — for example strategy acitivation</p>
            </div>
            
        </div>

    </section>
</template>

<style> 

    .grid__main{
        display: grid;
        grid-template-columns: repeat(12, 1fr);
    }

    .grid__main > h1{
        grid-column: 1/8;
            align-self: center;

        
    }
    .grid__main > img{
        grid-column: 8/13;
        align-self: center;
        width: 100%;
        
    }



    .world__overview-grid{
        display: grid;
        gap: clamp(0.5rem, 1vw, 2rem);
        grid-template-columns: repeat(5, auto);
    }



        @media (max-width:800px) {
        .world__overview-grid{
        display: grid;
        grid-template-columns: repeat(2, auto);

    }
    }

        @media (max-width:500px) {
        .world__overview-grid{
        display: block;}
    }

    .world__overview-grid--content  > button {
        width: 100% !important;
        margin-top: 0px;
    }

    button {
        cursor: pointer;
    }

    .btn:hover{
        opacity: 0.7;
        
    }
</style>