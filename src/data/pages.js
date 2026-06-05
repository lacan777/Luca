export const pages = [
  {
    id: 'cover',
    title: 'Portada',
    kind: 'single',
    image: '/book/macro-cover.png',
    narration: 'Doctor LUPA y la piel de Luka.',
  },
  {
    id: 'spread-02',
    title: 'Mi piel y yo',
    kind: 'spread',
    image: '/book/macro-page-02.png',
    narration:
      'Mi piel y yo. Las personas con sindrome de Down tienen una piel muy especial, pero a veces puede ser delicada y presentar senales que nos dicen que necesita cuidado. La piel es una parte muy importante de nuestro cuerpo, y por eso debemos observarla y pedir ayuda a un adulto o visitar al medico si notamos algo extrano. En este libro seremos detectives junto a Luka. El nos ayudara a explorar y conocer mejor nuestra piel. Vamos a convertirnos en guardianes de nuestra salud. Hola, soy Luka. Me gusta jugar, correr, dibujar y descubrir cosas nuevas. Hoy mi piel se siente un poco diferente. En algunas partes esta seca, en otras me pica, y en otras veo manchitas. Pero no estoy solo. Me ayudas a descubrir que quiere decir mi piel? Toma tu lupa, mira con cuidado y conviertete en mi Doctor Lupa. Busca las pistas.',
  },
  {
    id: 'spread-03',
    title: 'Que tendra Luka en la rodilla',
    kind: 'spread',
    image: '/book/macro-page-03.png',
    narration:
      'Que tendra Luka en la rodilla? Luka mira su rodilla y dice: Aqui mi piel se ve diferente. Se ve seca, un poco blanquita y aspera. Doctor Lupa, mira con cuidado. Usa tu lupa y busca la pista. Pista siguiente: Luka siente mucha comezon en el pecho. Descubrimos que es?',
    clues: [
      {
        id: 'knee',
        label: 'Pista de la rodilla',
        image: '/clues/knee.png',
        x: 69,
        y: 43,
        width: 15,
        height: 25,
        originX: 48,
        originY: 54,
      },
    ],
  },
  {
    id: 'spread-04',
    title: 'Luka siente comezon en el pecho',
    kind: 'spread',
    image: '/book/macro-page-04.png',
    narration:
      'Luka siente comezon en el pecho. Luka se toca el pecho y dice: Aqui me pica mucho. Su piel se ve rojita, con algunas escamitas. A veces se siente un poco grasita y molesta. Doctor Lupa, mira con cuidado. Usa tu lupa y busca la pista. Pista siguiente: Luka encontro un circulito sin cabello en su cabeza.',
    clues: [
      {
        id: 'chest',
        label: 'Pista del pecho',
        image: '/clues/chest.png',
        x: 67,
        y: 40,
        width: 15,
        height: 22,
        originX: 50,
        originY: 48,
      },
    ],
  },
  {
    id: 'spread-05',
    title: 'Luka tiene una pista en su cabello',
    kind: 'spread',
    image: '/book/macro-page-05.png',
    narration:
      'Luka tiene una pista en su cabello. Luka se mira en el espejo y dice: Aqui mi cabello se ve diferente. En su cabeza hay un pequeno circulo sin cabello. No le duele. Pero Luka quiere saber que pasa. Doctor Lupa, mira con cuidado. Usa tu lupa y busca la pista. Pista siguiente: Luka nota que una unita de su pie cambio de color.',
    clues: [
      {
        id: 'head',
        label: 'Pista del cabello',
        image: '/clues/head.png',
        x: 72,
        y: 16,
        width: 16,
        height: 22,
        originX: 56,
        originY: 48,
      },
    ],
  },
  {
    id: 'spread-06',
    title: 'Luka tiene una pista en su pie',
    kind: 'spread',
    image: '/book/macro-page-06.png',
    narration:
      'Luka tiene una pista en su pie. Luka mira su pie y dice: Esta unita se ve diferente. Cambio de color. Se ve un poco amarillita y mas gruesa. Doctor Lupa, mira con cuidado. Usa tu lupa y busca la pista. Las unas tambien nos cuentan cosas. Pista siguiente: Luka siente unos granitos rojos. Los revisamos con la lupa?',
    clues: [
      {
        id: 'foot',
        label: 'Pista del pie',
        image: '/clues/foot.png',
        x: 72,
        y: 61,
        width: 14,
        height: 22,
        originX: 54,
        originY: 66,
      },
    ],
  },
  {
    id: 'spread-07',
    title: 'Luka tiene una pista en su axila',
    kind: 'spread',
    image: '/book/macro-page-07.png',
    narration:
      'Luka tiene una pista en su axila. Luka levanta su brazo y dice: Aqui siento algo diferente. En su axila hay granitos rojitos. A veces pican y a veces molestan un poco. Doctor Lupa, mira con cuidado. Usa tu lupa y busca la pista. Pista siguiente: Luka nota que la piel de su cuello se ve mas oscurita.',
    clues: [
      {
        id: 'armpit',
        label: 'Pista de la axila',
        image: '/clues/armpit.png',
        x: 75,
        y: 25,
        width: 10,
        height: 27,
        originX: 56,
        originY: 54,
      },
    ],
  },
  {
    id: 'spread-08',
    title: 'Luka tiene la ultima pista en su cuello',
    kind: 'spread',
    image: '/book/macro-page-08.png',
    narration:
      'Luka tiene la ultima pista en su cuello. Luka se mira en el espejo y dice: Aqui mi piel se ve mas oscurita. En su cuello hay una zona cafecita y se siente un poco gruesa y aspera. No es suciedad. No hay que tallarla fuerte. Doctor Lupa, mira con cuidado. Usa tu lupa y busca la ultima pista.',
    clues: [
      {
        id: 'neck',
        label: 'Pista del cuello',
        image: '/clues/neck.png',
        x: 67,
        y: 34,
        width: 13,
        height: 15,
        originX: 50,
        originY: 48,
      },
    ],
  },
  {
    id: 'spread-09',
    title: 'Despues de encontrar todas las pistas',
    kind: 'spread',
    image: '/book/macro-page-09.png',
    narration:
      'Despues de encontrar todas las pistas. Luka fue con su mama y le conto lo que descubrio. Mama lo escucho con atencion y lo llevo con el doctor. El doctor reviso su piel, le explico que podia hacer y le recordo que cuidar la piel tambien es cuidar el cuerpo. Ahora Luka sabe que pedir ayuda esta bien y que su piel merece carino, atencion y cuidado.',
  },
  {
    id: 'spread-10',
    title: 'Lo hiciste Doctor LUPA',
    kind: 'spread',
    image: '/book/macro-page-10.png',
    narration:
      'Lo hiciste, Doctor Lupa. Hoy ayudaste a Luka a escuchar su piel. A veces la piel nos da pistas. Si algo pica, cambia o molesta, podemos pedir ayuda. Pedir ayuda tambien es cuidar el cuerpo. Gracias por acompanar a Luka. Mi piel me habla. Yo la escucho.',
  },
  {
    id: 'spread-11',
    title: 'Como cuido mi piel',
    kind: 'spread',
    image: '/book/macro-page-11.png',
    narration:
      'Como cuido mi piel? Cuidar mi piel tambien es querer a mi cuerpo. Banarme con agua tibia, no muy caliente. Usar jabon suave. Secar mi piel con suavidad. Poner cremita para mantenerla hidratada. No rascar ni apretar mi piel. Tomar agua y avisarle a un adulto si algo pica, duele o cambia. Mi piel se cuida con carino. Certificado Doctor Lupa. Yo cuide mi piel con atencion. Se que puedo decir si algo me pica, pedir ayuda a un adulto y cuidar mi piel con carino. Soy Doctor Lupa de la piel.',
  },
  {
    id: 'back-cover',
    title: 'Contraportada',
    kind: 'single',
    image: '/book/macro-back-cover.png',
    narration:
      'Acompana a Luka mientras descubre lo que su piel quiere contarle. Mi piel me habla, yo la escucho.',
  },
];
