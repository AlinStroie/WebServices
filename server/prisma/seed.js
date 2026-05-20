import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Curățăm datele vechi de test.
  // Ordinea contează din cauza relațiilor dintre tabele.
  await prisma.blogPostTag.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogTag.deleteMany();
  await prisma.blogCategory.deleteMany();

  // Creăm o categorie de blog.
  const category = await prisma.blogCategory.create({
    data: {
      name: "Web Design",
      slug: "web-design",
      description: "Articole despre website-uri, UX, conversie și prezență online.",
    },
  });

  // Creăm câteva taguri.
  const tagUx = await prisma.blogTag.create({
    data: {
      name: "UX",
      slug: "ux",
    },
  });

  const tagBusiness = await prisma.blogTag.create({
    data: {
      name: "Business",
      slug: "business",
    },
  });

  // Primul articol de test.
  const post1 = await prisma.blogPost.create({
    data: {
      title: "5 greșeli care fac un website să pară neprofesionist",
      slug: "5-greseli-care-fac-un-website-sa-para-neprofesionist",
      excerpt:
        "Un website poate pierde încrederea vizitatorilor în primele secunde. Iată cele mai comune greșeli care afectează imaginea unei afaceri.",
      content: `
Un website este de multe ori primul contact dintre o afacere și un potențial client. De aceea, aspectul, claritatea și modul în care este organizată informația contează foarte mult.

Prima greșeală este designul aglomerat. Atunci când utilizatorul vede prea multe culori, prea multe texte sau prea multe elemente care concurează între ele, îi este greu să înțeleagă ce oferă firma.

A doua greșeală este lipsa unei structuri clare. Un website bun trebuie să răspundă rapid la întrebările principale: cine ești, ce oferi, de ce ar trebui clientul să te aleagă și cum te poate contacta.

A treia greșeală este neglijarea versiunii mobile. Majoritatea utilizatorilor intră de pe telefon, iar un site greu de folosit pe mobil transmite lipsă de profesionalism.

A patra greșeală este viteza slabă de încărcare. Dacă pagina se încarcă greu, utilizatorul pleacă înainte să vadă oferta.

A cincea greșeală este lipsa unui call-to-action clar. Vizitatorul trebuie ghidat spre următorul pas: cerere de ofertă, apel, mesaj pe WhatsApp sau completarea unui formular.
      `.trim(),
      coverImage: "/blog/website-mistakes.jpg",
      status: "PUBLISHED",
      featured: true,
      readingMinutes: 4,
      metaTitle: "5 greșeli care fac un website să pară neprofesionist",
      metaDescription:
        "Află ce greșeli fac un website să pară neprofesionist și cum pot afecta încrederea clienților.",
      publishedAt: new Date(),
      categoryId: category.id,
    },
  });

  // Al doilea articol de test.
  const post2 = await prisma.blogPost.create({
    data: {
      title: "Cum influențează designul rata de conversie",
      slug: "cum-influenteaza-designul-rata-de-conversie",
      excerpt:
        "Designul nu înseamnă doar aspect vizual. El influențează direct cât de ușor ia utilizatorul o decizie.",
      content: `
Designul unui website are un impact direct asupra ratei de conversie. Un site bine structurat ajută utilizatorul să înțeleagă rapid oferta și să facă următorul pas.

Elementele importante sunt claritatea mesajului, poziționarea butoanelor, ierarhia vizuală și încrederea transmisă de pagină.

Un design bun reduce confuzia. Când utilizatorul știe exact unde să apese și ce primește, șansele să trimită o cerere cresc.
      `.trim(),
      coverImage: "/blog/design-conversie.jpg",
      status: "PUBLISHED",
      featured: false,
      readingMinutes: 3,
      metaTitle: "Cum influențează designul rata de conversie",
      metaDescription:
        "Designul unui website poate crește sau reduce numărul de cereri primite de o afacere.",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      categoryId: category.id,
    },
  });

  // Al treilea articol de test.
  const post3 = await prisma.blogPost.create({
    data: {
      title: "De ce majoritatea site-urilor pierd clienți fără să știe",
      slug: "de-ce-majoritatea-site-urilor-pierd-clienti-fara-sa-stie",
      excerpt:
        "Un site poate arăta acceptabil, dar totuși să piardă clienți prin lipsă de claritate, încredere sau direcție.",
      content: `
Multe website-uri pierd clienți nu pentru că serviciile sunt slabe, ci pentru că pagina nu comunică suficient de clar.

Utilizatorii au nevoie de răspunsuri rapide. Dacă trebuie să caute prea mult informația, dacă nu găsesc prețuri orientative sau dacă nu înțeleg beneficiile, vor pleca.

Un website eficient trebuie să combine designul cu strategia: structură clară, mesaje simple, dovezi de încredere și butoane vizibile.
      `.trim(),
      coverImage: "/blog/site-pierde-clienti.jpg",
      status: "PUBLISHED",
      featured: false,
      readingMinutes: 4,
      metaTitle: "De ce majoritatea site-urilor pierd clienți fără să știe",
      metaDescription:
        "Află de ce un website poate pierde clienți chiar dacă arată bine la prima vedere.",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      categoryId: category.id,
    },
  });

  // Legăm tagurile de articole.
  await prisma.blogPostTag.createMany({
    data: [
      {
        postId: post1.id,
        tagId: tagUx.id,
      },
      {
        postId: post1.id,
        tagId: tagBusiness.id,
      },
      {
        postId: post2.id,
        tagId: tagUx.id,
      },
      {
        postId: post3.id,
        tagId: tagBusiness.id,
      },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });