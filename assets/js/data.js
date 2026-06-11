/* =============================================================
   DONNÉES DU SITE — Erphaneh Sadeghzadeh
   -------------------------------------------------------------
   cover       : image locale affichée (placeholder tant que le
                 fichier images/<slug>/cover.jpg n'existe pas).
   coverRemote : URL d'origine sur le site Google (NON téléchargeable
                 sans session Google — conservée pour référence).
   images[]    : images de la page projet (lightbox). À compléter.
   Édite ce fichier pour gérer tout le contenu. Voir README.md.
   ============================================================= */

const WORK = [
  {
    slug: "three-four",
    titleEn: "3**4",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/three-four/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUB8EjseSE6We4oiAOhbhjjNTlwxU_B5Jwi5THc8FAJGE3TwrizZMuwxB8l1Jz_Hf-oUrRDgdC_LxSKEPlwnh41C2W55k4lCabWUe3gElfB6FC_abmXf8GE0oCq1eLNb225OHoikFMORjBaxgUBGAn8XWZ8WUIUuAJgfDJhdW1PigR8O3fOPyEn4DDeelguT4bBApAcUI3fibBHC_7usvi-ccqFJoEDXdAtspMhXQgo=w1280",
    images: ["images/three-four/01.jpg","images/three-four/02.jpg"]
  },
  {
    slug: "faceless-placeless",
    titleEn: "Faceless, Placeless",
    titleFa: "",
    years: "",
    medium: "Photography",
    description: "",
    cover: "images/faceless-placeless/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUDg22CTDyWpnrkWqlRCkwwPDwuPul3rY5MM63YxjNHyZmCWJKHbzAAmeu8XwgW2eU3dJoNdzjRvf1l-umschbuI_2ZWi3P9EIafDymjS1Ziwci9N2viUQ6OjOLU_wggQqE8dp10lRgkbNbCACwoPmTKHXi-zL1Lph35RYZsRDnQOjQ7o2V7UtQotlCjNtY_-81Rf1JCoXFHZgPvysrZ-6HGg2GhbVqwfTgnl90QbWo=w1280",
    images: ["images/faceless-placeless/01.jpg","images/faceless-placeless/02.jpg"]
  },
  {
    slug: "i-destroyed-my-comfort",
    titleEn: "I Destroyed My Comfort",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/i-destroyed-my-comfort/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUDZpaoFUgB0D4jcmga4npMqkyznMGbh8YOHlyjRR47nXqzoSN1393fa1wxV4Wrrs7ep9uph-U_X6hFMCZUKKm0c5qH8bIZMukKeS3dSVltJzWPUG1eH156p78I3_UcQVvJOQ0ux1l78pc02n11uglmrArXmBAZIj4K1iZb3dNxz4m7yQcTkZM07ASwZJzhzypCdzjMyKq1RK8irPfV94H4qcKCOEKxYmReszsAf=w1280",
    images: ["images/i-destroyed-my-comfort/01.jpg","images/i-destroyed-my-comfort/02.jpg"]
  },
  {
    slug: "i-will-keep-your-photos",
    titleEn: "I Will Keep Your Photos",
    titleFa: "",
    years: "",
    medium: "Archive",
    description: "",
    cover: "images/i-will-keep-your-photos/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUCK28p44-lG57SuR0PfB9Za0BPobSSxY80Z5Pia9zldSMEbSpML26cALg0vveYb5ylnoUD9uKmEPj7XcQc74mowlUhlLmdwqiOEnQLdUT6s9RDTjTFfRLVcPr1k09bsVDYWNGsTkKhdKj3kA96vjuXfDeZ3pG2_gbKMULf3pz2JTUzc4WZUT06c2vRj4YT6cCcOfbGSMM2Lh9xovxZ0hSOU6_XIzsTsxp16EX26pV8=w1280",
    images: ["images/i-will-keep-your-photos/01.jpg","images/i-will-keep-your-photos/02.jpg"]
  },
  {
    slug: "language-is-a-mattress",
    titleEn: "Language is a Mattress",
    titleFa: "",
    years: "",
    medium: "Installation",
    description: "",
    cover: "images/language-is-a-mattress/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAOqCfYry74f9P_HZEyjpYedmfE0P88BSd6ED_Q9bDDCll4h-lOUy-AtjeCWODgk_7QwTev84Y30lmkZjIsfICpy0ZtWgu8RLqkeOvb2s2ric8gC78zMcXLqjQlQRmUCcIwuyl5AhHoLH2Zl5OcQ1cN1yylqmEH0dzi8MHO2VVKcxUQSnXEM4QdnQ4rOYXEcuf5g0Y3Z36NjAG_ueM_8Mqe_7Tq8Krp8k_aPeoR=w1280",
    images: ["images/language-is-a-mattress/01.jpg","images/language-is-a-mattress/02.jpg"]
  },
  {
    slug: "found-objects-and-memories",
    titleEn: "Found Objects and Memories",
    titleFa: "",
    years: "",
    medium: "Archive",
    description: "",
    cover: "images/found-objects-and-memories/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAdGbJJSGXadOoM214XGD-pZaBDPSisVsiwVKtMQn7Th7GKyBi4bPJDs_8fVvzN28YxOodyem-IEiCvvwQFhkPeGTNT6iRy98f-jj9tN1wrOhabyVLcxk5RgsVAkcNRToda5xjQMNIXsQkI0hdK-SoRDtm0mzLyIq41DXiFCUafCWsQ7qWyZlb0S2m62TjF4ntC88ZJ0IV5ritwtzcYwNFhz7p8u9VcRjHbDxOfR0E=w1280",
    images: ["images/found-objects-and-memories/01.jpg","images/found-objects-and-memories/02.jpg"]
  },
  {
    slug: "drecksarbeit",
    titleEn: "Drecksarbeit",
    titleFa: "",
    years: "",
    medium: "Installation",
    description: "",
    cover: "images/drecksarbeit/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUCKC4CdBAQzE7lHx3bry8mnDF8T4sv0VN1qvgp6m2Ovc6GOD3a6jZDRF-R3X4cfjlRkKNCVfNC2pXSfLYgQXva0voqqT44_dbIWp17jiXSiJYHCG0NTEZ9kRYZqSNqC14D_I2u3sYMAL10L_ruCakzVzrGMmAXsv3TA6WkpKsO_hNjmUl0PJFvBsdK-1FgThR-xNP74pbFLnouoddo3HnOBzJn1igQUnKgZ252l=w1280",
    images: ["images/drecksarbeit/01.jpg","images/drecksarbeit/02.jpg"]
  },
  {
    slug: "a-love-note",
    titleEn: "A Love Note",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/a-love-note/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAWvZcuU8vp4lKKnwIWSqUYFA9s2mf5q_15_Ksk74DBvkemI5OVwD069hpIggxutIHK3w0MXSnhVlK0mZzPURiNFT7hpd8L4ttozkzoigkxXxdK7I4gi83OeymxceS1uVk_m-6_qpGNbc0VpLiXWZeVDkgvcs96I1RwEqu0Bh8V1V7tgwSPtDb0wxDJza9Nkvvfs6Csbd0EsAc-4ornUISSO8Oej_PA5R-zdGuUuFk=w1280",
    images: ["images/a-love-note/01.jpg","images/a-love-note/02.jpg"]
  },
  {
    slug: "tasvir-archive-exhibition",
    titleEn: "Tasvir Archive Exhibition",
    titleFa: "",
    years: "",
    medium: "Exhibition, archive",
    description: "",
    cover: "images/tasvir-archive-exhibition/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAVhPZxWcJ8bTYVIn8VeDekMS5kA7_K4ahnuUbEhU4SoSQ3PVOv5C-WQBMql0YBvSObnazNF3GnW3w2vIqMz2lHwDyuf1Di-Gb1AtHINNGP0PaxxyzUO0EKOjbdJo-4w7tEUuiL4yZFd3B3p7OLa5ByXb4VeUrGKrd6wHV89oG_QjMiADmyTjDdzD_GRweogOIR2ZcLYVjn1rI9eTC2ibr60oc1X0wILt1fVlc6Pjk=w1280",
    images: ["images/tasvir-archive-exhibition/01.jpg","images/tasvir-archive-exhibition/02.jpg"]
  },
  {
    slug: "self-portrait-venice-biennale",
    titleEn: "Self Portrait at Venice Biennale",
    titleFa: "",
    years: "",
    medium: "Exhibition",
    description: "",
    cover: "images/self-portrait-venice-biennale/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUB8mrFeTuNFynn0Zo7IFgjdNw6Vtm2aOaKOkCO1Z2xvBZGsFnw9CqhbXgx_D3fe8EIYpRFp4hHOkAkgyxsuUwyUcKDerRgSbVybYPjM4AMWf48FI-VbCFfiPdskwcSkeDTOQoJGFRAeMVAg0An-wJqwvQD7s1c4baQ36WaEXfe5dn0wcvfW193amgZifd4ILnWFs5okst7yhPR-p6H3u57jZZqlJBCHF-tzYqMh=w1280",
    images: ["images/self-portrait-venice-biennale/01.jpg","images/self-portrait-venice-biennale/02.jpg"]
  },
  {
    slug: "where-do-you-feel-comfortable-in-weimar",
    titleEn: "Where Do You Feel Comfortable in Weimar?",
    titleFa: "",
    years: "",
    medium: "Public intervention",
    description: "",
    cover: "images/where-do-you-feel-comfortable-in-weimar/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAQTAADTwexlr96iKCQRxb5TMU04pxy25XCwX7VSw9Eliz2EV6JEdxeMDcGZK22vHG60VWJqihkZHtngb81RB4CmmepZIc2TaTDJKNZGUIGqV7HLincL_VqGw7ucnwma65vd6twNHwv_D-7XEf5T-jrIhz73oyMw9L2nxOzKC5edynRw2A58lRBxA_SUvqfG1ZZJ9tYQEqAc9z_C2nunhT1X8KQm-Lq9Kl34WxbJH8=w1280",
    images: ["images/where-do-you-feel-comfortable-in-weimar/01.jpg","images/where-do-you-feel-comfortable-in-weimar/02.jpg"]
  },
  {
    slug: "sunsick",
    titleEn: "Sunsick",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/sunsick/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUC6DKerJpq9RTsLdDJvYoD4DpUxz_QMHlOYIrA21daxrcfsaou9DJR_53IhvFNt9OBvLEF_oAS0I_S8nFJ19VD2D0UFviZx8ovhdPlkiFbGxarMUMzsfmRtb3qySHj8bjMfwfkMlLsaM-P4bnoZ2vdz8wfjlKheSG2LYX5XZgT9aqaVc9GKCpPZ3bdYG91S5feRQkSXZJNoaG0AN3xIyULMckutugagC_1bzhPmDPA=w1280",
    images: ["images/sunsick/01.jpg","images/sunsick/02.jpg"]
  },
  {
    slug: "on-body-and-soul",
    titleEn: "On Body and Soul",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/on-body-and-soul/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUCuIT5-eMb9p5t42PjLibQtk4Rkt1WGvmCZOOYP_xfsaEr777wv8tz44L26N536COg0Y3ZVUCsvyrcFhK4NLoQ6NyFsHnfOSTqNrRu0iBtmBsOGNrvYaxlaxULdtzjmRdf2XxkbDmlAdXgRI2i-z0DYfpZxAFwb8zvofOpLXBhv2MHjxO7KKpzk1aAxywZPhMJZ_e_eHykX0ChfADtqTXts599hsieJiHiFT5nU7gk=w1280",
    images: ["images/on-body-and-soul/01.jpg","images/on-body-and-soul/02.jpg"]
  },
  {
    slug: "sign-of-connection",
    titleEn: "Sign of Connection",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/sign-of-connection/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUDOz28sHf2gcxahlakzC90ovzavqBZ5_5qDYe52zsae1Ae8vs69z4UYJpyRriWxZIt9tqgJpxmfXlEKC3nij_sKhcshe-WBgHnULlgnBl7xLy5ebBI9O7KhQw-_3AeGrT69lvwFEreSaFJQZ36Kw-FhPUtTYB55epmnJWRgYOm2YOymw4kXN_Goee6bbChh0CSZAuu7KdjnHL_F0U_v1rzJuIJptqIupyqfqVA7=w1280",
    images: ["images/sign-of-connection/01.jpg","images/sign-of-connection/02.jpg"]
  },
  {
    slug: "cassette-castle",
    titleEn: "Cassette Castle",
    titleFa: "",
    years: "",
    medium: "Installation",
    description: "",
    cover: "images/cassette-castle/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUBKShdS-fDOFcPJKXVU3GQOXi2oqP-EUbZOoIK-Tf12AZ5ifInYOTHiVvW5EV2svbwt9uGyfilL1ZHTD1Or707YXFDTqsKkxmVRh_WzNmHySTSPaZtEFn_oGlXCrtnV6OmiaYGwCAmj2ogmo_TzqlRwvS7vZmQstJUF9-uSyCTa727_TYPP8fqaMGG3PvMt483tM5vTJd9ZegYeRQkJPpcbWIDwkDh6Nvvj2ux4=w1280",
    images: ["images/cassette-castle/01.jpg","images/cassette-castle/02.jpg"]
  },
  {
    slug: "in-the-nature-of-being",
    titleEn: "In the Nature of Being",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/in-the-nature-of-being/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUBq8MQhya8ZlexuuPMAuJOMEEwAUaEaF4j4uQBJVCVvpbdNxbeN0pnFnXnuwaEavjayJuYcAogPuj9X8k7ukPFztxrZI1IUSEJM-9ebG0kpjym7lRh0QkCuQT7lk5IdsE9UAqHzW3tcPJSHBborx-YatGGW9jphyjh6Yzjmg5klC31d56dhiv0FNnGtCgEs3cbXg9j7ELZmAy40VNA2SYDjIFGQCwdNaLxNS2yrQPU=w1280",
    images: ["images/in-the-nature-of-being/01.jpg","images/in-the-nature-of-being/02.jpg"]
  },
  {
    slug: "over-and-over",
    titleEn: "Over and Over",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/over-and-over/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAL6OQoa-2iUVGNOIBxE052-0C6Eoi1M6coCcHbpmqylhn_xXsv_3UH8B2E3SYCCVEJIdh41u1w2m_F5PTmcQB49rMW3aHJ9WHZ1Q4latMZ6Y4fWIkSmj1KDexJ3BM7m20Z2cCkQOo0dyq5dqse56xlYpgDznsv6JGh1nO8rdjjbxZC49BXaPA4LX4bG4PAUM5R4YmmwAq-3zgsOhGuqsKsqL87MnLZDwXSBYx1=w1280",
    images: ["images/over-and-over/01.jpg","images/over-and-over/02.jpg"]
  },
  {
    slug: "in-die-steine",
    titleEn: "In die Steine",
    titleFa: "",
    years: "",
    medium: "",
    description: "",
    cover: "images/in-die-steine/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUBeWPI7gJUMUNK1P7ufUrkfn-PKQFNHlDKV-yFAaHc9AcamiU4ThruKljRvs05na2dM8MTj1yfNbfoQeXMk3EaBUmpZLynkCsk-LKhis9nzrS86HFt-y47gvM0E5gpKMvyXF2lJC-jZT009LEkj55w3_mqxJ1lFjClh7YTR3DD437wf0II0rIZ0L4zCPegv5pOOFTPNrT8k4IXSxhC9UznW7XOiX1pY9hyphjYm6Zo=w1280",
    images: ["images/in-die-steine/01.jpg","images/in-die-steine/02.jpg"]
  }
];

const FILMS = [
  {
    slug: "muttering-from-the-edges",
    titleEn: "Muttering from the Edges",
    titleFa: "",
    years: "",
    medium: "Film",
    description: "",
    video: "",
    cover: "images/muttering-from-the-edges/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUAJ2k3HW3kF3Za-zZV-Gvtc0aYKfR9VDJx2DWWh2mNUTvTKqxXpvl48eFJkyKWOTTRLkEj9sp7_ztN0GNQQWXJ1wSvPTDjsqGuwlZSIBFx-3EAEHMYpCCiSbt3QMiZJ9kREXQjUHNZiyv_S1XcLMh0HOsdEtCJGKfUMn0PUAscOrEBxEtcfxVzuUiqUgL8dxcBWqsxwU95W9PrRJCyv_KJeTa3d6Ex-6AL9Gq3Zo-Q=w1280",
    images: ["images/muttering-from-the-edges/01.jpg","images/muttering-from-the-edges/02.jpg"]
  },
  {
    slug: "land-escape",
    titleEn: "Land-escape",
    titleFa: "",
    years: "",
    medium: "Film",
    description: "",
    video: "",
    cover: "images/land-escape/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUDZqLDZ4mAkHRlpDbLYwr7QJHpqvBtz1vAvi1_zp43lqu0V1iC8_pZZN86ee6P5lfxNVYPNVFjpUueuxcL1JXaXY0ZLZNduBmBB0D5uq6aOj3CtbIJpMaTEY5jPttt6JoipB6ImlnWuciPIge6hLnPzLbnpmtg-byW1n67JqVrGbt4nQaY15CSl9Ygztq_ZNJBtknS8Y3WcsF5cfUJ50YZjQJyZSwSXrA5Kg5Vn=w1280",
    images: ["images/land-escape/01.jpg","images/land-escape/02.jpg"]
  },
  {
    slug: "another-me",
    titleEn: "Another Me",
    titleFa: "",
    years: "",
    medium: "Film",
    description: "",
    video: "",
    cover: "images/another-me/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUA2iESuImXjHIYtXbYuxs2kJFHy-iqDAx49bmeFDv70aEQEpwLdiV-RSBVIYm1VJ6OwDWEZ4LdNhB63Fk-5xLQRLUKxftMHJ6Czzjpu7VbztmRSMaKgbR7pao8t-iWkFdYVfBEk1ltcL8d-5KQdiT9B0R_YJMbaz5-EHlgL7gkDhrJft_7tEkj81iBGm5ixGbtnpaZHiDvmYyt76tDBeubMMUcYiSClTMI5F1cz5kE=w1280",
    images: ["images/another-me/01.jpg","images/another-me/02.jpg"]
  },
  {
    slug: "de-collage",
    titleEn: "De-collage",
    titleFa: "",
    years: "",
    medium: "Film",
    description: "",
    video: "",
    cover: "images/de-collage/cover.jpg",
    coverRemote: "https://lh3.googleusercontent.com/sitesv/AA5AbUCzzpvbHbnshhnRGRwzj-6QJN3gkRWXWnxkOg9qYyDSKFsG_CdIQyd1GLLwwIqc0fu2GjtgCulxhFcVk3LmIqSPOKdPXpJx2kYQXduZ1QEnUNZyN5lR6YzLQrgUF7EcsEtuGZOJvE-6Y_N84B9Gv9p7OQ-GYSiWeo54Um_xB6dLLZpFNvIm8OYJhlkO2hD-uPtVs5akr9-i8WorFx_-LPzFGThoKAElgmHn_7nMA98=w1280",
    images: ["images/de-collage/01.jpg","images/de-collage/02.jpg"]
  }
];

const SITE = {
  "name": "Erphaneh Sadeghzadeh",
  "email": "Erphane.sadeghzadeh@gmail.com",
  "about": [
    "Erphaneh Sadeghzadeh is an interdisciplinary artist and filmmaker from Iran, based in Berlin, Germany.",
    "She holds a B.A. in Cinema and is currently pursuing an M.F.A. at the Bauhaus-University Weimar.",
    "Working across analogue photography, video, archive, collage and installation, her practice is deeply personal — exploring themes of identity, memory and history."
  ],
  "portrait": "images/about/portrait.jpg",
  "portraitCredit": "Photo: Carlos Santos"
};

window.SITE_DATA = { WORK, FILMS, SITE };
