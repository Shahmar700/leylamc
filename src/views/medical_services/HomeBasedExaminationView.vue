<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Ünvanda xidmət</h1>
                <p class="text-base sm:text-lg">Bəzən olduğumuz məkanı tərk edə bilmirik. Səhhətimiz də zamana və məkana tabe olmur. Belə olan halda ən böyük köməyimiz tibbi xidmətin yanımıza - evimizə və ya olduğumuz məkana gəlməsidir.</p>
                <br>
                <p class="text-base sm:text-lg">Referans Medical Groupun tərkibinə daxil olan Leyla Medical Center hər an və hər ünvanda pasiyentlərinin sağlamlığının keşiyində durmaq üçün ÜNVANDA XİDMƏT layihəsi ilə pasiyentlərinin hər an yanındadır. Ünvanda müayinə xidməti həm də xəstəxanada növbə gözləməyə, marşrut istiqamətini dəyişməyə, tıxacda qalmağa, komfortunu pozmağa ehtiyac olmadan rahat və komfortlu tibbi xidmət almaq üçün ən optimal üsuldur. Bir zənglə Leyla Medical Center-in keyfiyyətli tibbi xidməti olduğunuz ünvana gələcək.</p>
                <br>
                <p class="text-base sm:text-lg">Ünvanda müayinəyə daxilində aşağıdakı xidmətlər göstərilir:</p>
                <br>
                <ol class="ml-7 list-decimal">
                    <li class="mb-1 text-base sm:text-lg">
                        Ünvanda laborator müayinələr (7000 yaxın)
                    </li>
                    <li class="mb-1 text-base sm:text-lg">
                        Həkim çağırışı
                    </li>
                    <li class="mb12 text-base sm:text-lg">
                        Peyvəndlər
                    </li>
                    <li class="mb-1 text-base sm:text-lg">
                        İnfuziyalar və sarğılar
                    </li>
                    <li class="mb-1 text-base sm:text-lg">
                        Hər növ check-up
                    </li>
                    <li class="mb-1 text-base sm:text-lg">
                        İnstrumental müayinələr (EKQ, EXO, Holter, USM, neyrosonoqrafiya, rentgen)
                    </li>
                    <li class="mb-1 text-base sm:text-lg">
                        Dərmanların çatdırılması
                    </li>
                </ol>
                <p class="text-base sm:text-lg">Həkim çağırışları, xüsusən pediatrların ünvanda xidmət göstərməsi, uşaqlarımızın öyrəşdiyi məkandan ayrılmadan müayinə olunması, peyvəndlərin vaxtı-vaxtında icra edilməsi valideynlər üçün (əsasən də işləyən valideynlər üçün) sərfəlidir !</p>
                <br>
                <p class="text-base sm:text-lg">Uzun müddət yataq xəstələrinə, əməliyyat sonrası dövr pasiyentlərinə sarğıların dəyişdirilməsi, infuziyalar icra edilməsi bir çox ailələrə böyük köməklik olacaqdır. Mərkəzimizin məqsədi - günün tələbinə uyğun, operativ və keyfiyyətli tibbi xidmət göstərərək, hər bir pasiyentin dəyərli olduğunu ona hiss etdirməkdir.</p>
                <br>
                <p class="text-base sm:text-lg">Siz buna layiqsiniz!</p>
                <br>
                <p class="text-base sm:text-lg">Bir zəng yetər!</p>
                <br>
                <p class="text-base sm:text-lg">Ünvanda xidmət yanınızdadır.</p>
                <br>
                <p class="text-base sm:text-lg">Ətraflı məlumat üçün: *0101 çağrı mərkəzi və ya 012 490 21 31, 012 490 18 58 şəhər telefonlarından və mobil operatorlardan  050 225 73 30 və 50 225 44 54 vasitəsilə əlaqə saxlamaq mümkündür.</p>
                <div>
                    <a target="_blank" href="https://www.instagram.com/p/CeX12HQND_0/?utm_source=ig_web_copy_link"></a>
                </div>

            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>