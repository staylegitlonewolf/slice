import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTimeAgo, getDateFromTimeAgo } from '../utils/timeUtils';

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [currentReviewPhotos, setCurrentReviewPhotos] = useState<string[]>([]);

  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const openPhotoViewer = (photos: string[], index: number) => {
    setCurrentReviewPhotos(photos);
    setSelectedPhotoIndex(index);
    setShowLightbox(true);
    // Update thumbnail start index to show the selected photo in view
    const thumbnailsPerPage = 4;
    const newStartIndex = Math.floor(index / thumbnailsPerPage) * thumbnailsPerPage;
    setThumbnailStartIndex(newStartIndex);
  };

  const handleLightboxClose = () => {
    setShowLightbox(false);
    setIsAutoPlaying(false); // Stop auto-play when closing
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleThumbnailNavigation = (direction: 'prev' | 'next') => {
    const thumbnailsPerPage = 4;
    const maxStartIndex = Math.max(0, currentReviewPhotos.length - thumbnailsPerPage);
    
    if (direction === 'prev') {
      setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - thumbnailsPerPage));
    } else {
      setThumbnailStartIndex(Math.min(maxStartIndex, thumbnailStartIndex + thumbnailsPerPage));
    }
  };

  // Swipe handling functions
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedPhotoIndex < currentReviewPhotos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
    if (isRightSwipe && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  // Update current time every minute for real-time timestamps
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timeInterval);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let autoPlayInterval: NodeJS.Timeout;
    
    if (isAutoPlaying && currentReviewPhotos.length > 1) {
      autoPlayInterval = setInterval(() => {
        setSelectedPhotoIndex(prev => 
          prev < currentReviewPhotos.length - 1 ? prev + 1 : 0
        );
      }, 3000); // Change photo every 3 seconds
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [isAutoPlaying, currentReviewPhotos.length]);

  const parseDate = (dateString: string): Date => {
    try {
      const now = new Date();
      const monthsAgo = parseInt(dateString.match(/\d+/)?.[0] || '0');

      if (dateString.includes('days ago')) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - monthsAgo);
      } else if (dateString.includes('months ago')) {
        return new Date(now.getFullYear(), now.getMonth() - monthsAgo, now.getDate());
      } else if (dateString.includes('years ago')) {
        return new Date(now.getFullYear() - monthsAgo, now.getMonth(), now.getDate());
      } else if (dateString.includes('year ago')) {
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      } else if (dateString.includes('month ago')) {
        return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      }

      return now; // fallback
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
      return new Date(); // fallback
    }
  };

  // Function to get localized review content
  const getLocalizedReview = (review: any) => {
    if (language === 'es' && review.contentEs) {
      return {
        ...review,
        content: review.contentEs,
        name: review.nameEs || review.name
      };
    }
    return review;
  };

  const allReviews = [
    {
      id: 1,
      name: "Mayte Garcia",
      nameEs: "Mayte García",
      avatar: "MG",
      date: new Date(2025, 0, 15), // January 15, 2025
      rating: 5,
      content: "We hosted our Back to School celebration at Slice and couldn't have asked for a better experience! The venue is absolutely beautiful, the staff was incredible, and they went above and beyond to ensure it was a memorable night for everyone. We are so grateful for their hospitality and highly recommend Slice for any special event!",
      contentEs: "¡Organizamos nuestra celebración de Regreso a Clases en Slice y no podríamos haber pedido una mejor experiencia! El lugar es absolutamente hermoso, el personal fue increíble, y fueron más allá para asegurar que fuera una noche memorable para todos. ¡Estamos muy agradecidos por su hospitalidad y recomendamos altamente Slice para cualquier evento especial!",
      hasPhotos: true,
      photoCount: 5,
      photos: [
        "/6_Testimonials/MayteGarcia/1.png",
        "/6_Testimonials/MayteGarcia/2.png",
        "/6_Testimonials/MayteGarcia/3.png",
        "/6_Testimonials/MayteGarcia/4.png",
        "/6_Testimonials/MayteGarcia/5.png"
      ]
    },
    {
      id: 2,
      name: "Kalhan Raina",
      nameEs: "Kalhan Raina",
      avatar: "KR",
      date: new Date(2025, 0, 10), // January 10, 2025
      rating: 5,
      content: "Patty is so amazing and helpful, a level of hospitality that would make you think you are having a party at her house and not an event venue. Everything is arranged beautifully and service is seamless.",
      contentEs: "Patty es increíble y muy servicial, un nivel de hospitalidad que te haría pensar que estás teniendo una fiesta en su casa y no en un lugar de eventos. Todo está arreglado hermosamente y el servicio es perfecto.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 3,
      name: "Alina Gonzalez",
      nameEs: "Alina González",
      avatar: "AG",
      date: new Date(2024, 11, 15), // December 15, 2024
      rating: 5,
      content: "Patty is fantastic. She always responded quickly, offered great suggestions, and was passionate about making my birthday party special. Her staff were also very friendly and welcoming. The venue is perfect and the white couches is such a nice touch around the dance floor. I would definitely have another party here. My guests loved it too. Thank you for everything. You're an amazing host.",
      contentEs: "Patty es fantástica. Siempre respondió rápidamente, ofreció excelentes sugerencias y se apasionó por hacer que mi fiesta de cumpleaños fuera especial. Su personal también fue muy amigable y acogedor. El lugar es perfecto y los sofás blancos son un toque tan agradable alrededor de la pista de baile. Definitivamente tendría otra fiesta aquí. A mis invitados también les encantó. Gracias por todo. Eres una anfitriona increíble.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 4,
      name: "Agnieszka A.",
      nameEs: "Agnieszka A.",
      avatar: "AA",
      date: "2 months ago",
      rating: 5,
      content: "Slice hosted our annual corporate Holiday Party last December, and the experience was nothing short of exceptional. Patty, the owner, is truly amazing—it was an absolute pleasure working with her. She collaborated with us on every detail, helping to create an unforgettable event for everyone. The food was delicious, the service top-notch, and the venue itself is stunning. With its perfect lighting and thoughtful décor, it offers a warm and vibrant atmosphere that's ideal for celebrating any occasion.",
      contentEs: "Slice organizó nuestra fiesta corporativa anual de Navidad el pasado diciembre, y la experiencia no fue menos que excepcional. Patty, la propietaria, es realmente increíble: fue un absoluto placer trabajar con ella. Colaboró con nosotros en cada detalle, ayudando a crear un evento inolvidable para todos. La comida estaba deliciosa, el servicio de primera clase, y el lugar en sí es impresionante. Con su iluminación perfecta y decoración cuidadosa, ofrece una atmósfera cálida y vibrante que es ideal para celebrar cualquier ocasión.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 5,
      name: "Maria Tako",
      nameEs: "María Tako",
      avatar: "MT",
      date: "2 months ago",
      rating: 5,
      content: "Thank you to Patty and the Slice team for making my daughters' birthday parties so fun! From the moment you engage with Patty, you feel like you are at home. Her and the team think of everything, make great suggestions to elevate your event and are there with you every step of the way! I highly recommend having your event at Slice!",
      contentEs: "¡Gracias a Patty y al equipo de Slice por hacer que las fiestas de cumpleaños de mis hijas fueran tan divertidas! Desde el momento en que te relacionas con Patty, te sientes como en casa. Ella y el equipo piensan en todo, hacen excelentes sugerencias para elevar tu evento y están contigo en cada paso del camino. ¡Recomiendo altamente tener tu evento en Slice!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 6,
      name: "Grace Encarnacion",
      nameEs: "Grace Encarnación",
      avatar: "GE",
      date: "6 months ago",
      rating: 5,
      content: "I celebrated my birthday at Slice and it was an incredible experience! From the moment we arrived, the atmosphere was perfect for the occasion. The food was exceptional; every dish was delicious and beautifully presented, which left all my guests delighted. The place was impeccably clean, which really added an extra touch of comfort and elegance to the celebration. Plus, I felt very safe thanks to the excellent security measures they have in place. But what truly made a difference was the service from the staff. They were friendly, attentive, and ensured everything was perfect throughout the night. They definitely made my birthday even more special. I highly recommend Slice to anyone looking to celebrate a special occasion. I can't wait to go back!",
      contentEs: "¡Celebré mi cumpleaños en Slice y fue una experiencia increíble! Desde el momento en que llegamos, la atmósfera era perfecta para la ocasión. La comida fue excepcional; cada plato estaba delicioso y bellamente presentado, lo que dejó a todos mis invitados encantados. El lugar estaba impecablemente limpio, lo que realmente agregó un toque extra de comodidad y elegancia a la celebración. Además, me sentí muy segura gracias a las excelentes medidas de seguridad que tienen implementadas. Pero lo que realmente marcó la diferencia fue el servicio del personal. Fueron amigables, atentos y se aseguraron de que todo fuera perfecto durante toda la noche. Definitivamente hicieron que mi cumpleaños fuera aún más especial. Recomiendo altamente Slice a cualquiera que busque celebrar una ocasión especial. ¡No puedo esperar a regresar!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 7,
      name: "Krissy Cowheard",
      nameEs: "Krissy Cowheard",
      avatar: "KC",
      date: "6 months ago",
      rating: 5,
      content: "I recently hosted a luncheon for my daughter's baby shower at Slice. I couldn't be more thrilled with how everything turned out! The venue itself is absolutely gorgeous, with warm, inviting atmosphere that set the perfect tone for the celebration. The staff was incredibly friendly and accommodating, ensuring that every detail was taken care of. The food was delicious, with a variety of options that satisfied all of our guests. We were truly made to feel special from start to finish. I highly recommend Slice for any event — it made my daughter's baby shower unforgettable!",
      contentEs: "Recientemente organicé un almuerzo para el baby shower de mi hija en Slice. ¡No podría estar más emocionada con cómo resultó todo! El lugar en sí es absolutamente hermoso, con una atmósfera cálida y acogedora que estableció el tono perfecto para la celebración. El personal fue increíblemente amigable y complaciente, asegurándose de que cada detalle fuera atendido. La comida estaba deliciosa, con una variedad de opciones que satisfizo a todos nuestros invitados. Realmente nos hicieron sentir especiales de principio a fin. Recomiendo altamente Slice para cualquier evento: ¡hizo que el baby shower de mi hija fuera inolvidable!",
      hasPhotos: true,
      photoCount: 12,
      photos: [
        "/6_Testimonials/KrissyCowheard/1.png",
        "/6_Testimonials/KrissyCowheard/2.png",
        "/6_Testimonials/KrissyCowheard/3.png",
        "/6_Testimonials/KrissyCowheard/4.png",
        "/6_Testimonials/KrissyCowheard/5.png",
        "/6_Testimonials/KrissyCowheard/6.png",
        "/6_Testimonials/KrissyCowheard/7.png",
        "/6_Testimonials/KrissyCowheard/8.png",
        "/6_Testimonials/KrissyCowheard/9.png",
        "/6_Testimonials/KrissyCowheard/10.png",
        "/6_Testimonials/KrissyCowheard/11.png",
        "/6_Testimonials/KrissyCowheard/12.png"
      ]
    },
    {
      id: 8,
      name: "Helon Raines",
      nameEs: "Helon Raines",
      avatar: "HR",
      date: "7 months ago",
      rating: 5,
      content: "My company had a party at Slice a few weeks ago and it was absolutely amazing! Patty and her team were on top of everything leading to the event and the night of the event went so smoothly. Everyone that attended the party loved how it turned out and raved about the food. We also had a casino vendor come in, which went perfectly. The venue was able to accommodate 8 tables while still having plenty of space for seating and a dance floor! I highly recommend Slice to anyone who is looking for a great venue - especially if you want an open bar!",
      contentEs: "¡Mi empresa tuvo una fiesta en Slice hace unas semanas y fue absolutamente increíble! Patty y su equipo estuvieron al tanto de todo antes del evento y la noche del evento transcurrió tan suavemente. Todos los que asistieron a la fiesta amaron cómo resultó y elogiaron la comida. También tuvimos un proveedor de casino que vino, y todo salió perfectamente. ¡El lugar pudo acomodar 8 mesas mientras aún tenía mucho espacio para asientos y una pista de baile! Recomiendo altamente Slice a cualquiera que esté buscando un gran lugar, ¡especialmente si quieres un bar abierto!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 9,
      name: "Tania",
      nameEs: "Tania",
      avatar: "T",
      date: "7 months ago",
      rating: 5,
      content: "Slice Weston hosted my 60th birthday party. I had about 60 friends and family. The venue was just what I wanted. Not too big and not too small. A nightclub feel and we dance all night!! Thank you to Patty and her staff for the drinks and delicious food! Everyone had a blast!!",
      contentEs: "Slice Weston organizó mi fiesta de cumpleaños número 60. Tuve alrededor de 60 amigos y familiares. El lugar era exactamente lo que quería. No muy grande y no muy pequeño. ¡Una sensación de discoteca y bailamos toda la noche! ¡Gracias a Patty y su personal por las bebidas y la deliciosa comida! ¡Todos se divirtieron muchísimo!",
      hasPhotos: true,
      photoCount: 1,
      photos: [
        "/6_Testimonials/Tania/1.png"
      ]
    },
    {
      id: 10,
      name: "Valentina Lee",
      nameEs: "Valentina Lee",
      avatar: "VL",
      date: "8 months ago",
      rating: 5,
      content: "Slice was a perfect venue to celebrate our daughter's fifteenth birthday. Working with Patty and her team was a pleasure. She made sure to answer all of my questions and was always available to brainstorm ideas and make recommendations. The party venue itself was perfect for our guests, the food was excellent, and the service from the staff on the day of the event was friendly and on point. Our guests had a great time from beginning to end. We are so glad to have chosen Slice!",
      contentEs: "Slice fue un lugar perfecto para celebrar el decimoquinto cumpleaños de nuestra hija. Trabajar con Patty y su equipo fue un placer. Se aseguró de responder todas mis preguntas y siempre estuvo disponible para intercambiar ideas y hacer recomendaciones. El lugar de la fiesta en sí era perfecto para nuestros invitados, la comida era excelente, y el servicio del personal el día del evento fue amigable y preciso. Nuestros invitados se divirtieron de principio a fin. ¡Estamos tan contentos de haber elegido Slice!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 11,
      name: "Christelle Joseph",
      nameEs: "Christelle Joseph",
      avatar: "CJ",
      date: "8 months ago",
      rating: 5,
      content: "We recently celebrated my mom's 60th birthday at Slice, and it was absolutely perfect! The venue was the ideal setting for our disco-themed party-- chic, vibrant, and full of personality. Patty and her team went above and beyond to make the night unforgettable.",
      contentEs: "Recientemente celebramos el cumpleaños número 60 de mi mamá en Slice, ¡y fue absolutamente perfecto! El lugar era el escenario ideal para nuestra fiesta con temática disco: elegante, vibrante y llena de personalidad. Patty y su equipo fueron más allá para hacer la noche inolvidable.",
      hasPhotos: true,
      photoCount: 2,
      photos: [
        "/6_Testimonials/ChristelleJoseph/1.png",
        "/6_Testimonials/ChristelleJoseph/2.png"
      ]
    },
    {
      id: 12,
      name: "Eddy Gutierrez",
      nameEs: "Eddy Gutiérrez",
      avatar: "EG",
      date: "9 months ago",
      rating: 5,
      content: "Slice is the ultimate spot for parties and family events! The venue is clean, spacious, and beautifully set up to accommodate both kids and adults. The staff went above and beyond to ensure everything ran smoothly, from helping with decorations to making sure all our guests were comfortable. The food was a major highlight—delicious, fresh, and loved by everyone! If you're looking for a place that combines great ambiance, fantastic service, and family-friendly vibes, Slice is it. We'll definitely be back for future events! Highly recommend!",
      contentEs: "¡Slice es el lugar definitivo para fiestas y eventos familiares! El lugar está limpio, espacioso y bellamente configurado para acomodar tanto a niños como a adultos. El personal fue más allá para asegurar que todo funcionara sin problemas, desde ayudar con las decoraciones hasta asegurarse de que todos nuestros invitados estuvieran cómodos. ¡La comida fue un punto destacado importante: deliciosa, fresca y amada por todos! Si estás buscando un lugar que combine gran ambiente, servicio fantástico y vibraciones familiares, Slice es el indicado. ¡Definitivamente regresaremos para eventos futuros! ¡Altamente recomendado!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 13,
      name: "Piedad Echeverri",
      nameEs: "Piedad Echeverri",
      avatar: "PE",
      date: "9 months ago",
      rating: 5,
      content: "Super cool venue to enjoy any type of celebration imaginable!",
      contentEs: "¡Un lugar súper genial para disfrutar cualquier tipo de celebración imaginable!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 46,
      name: "Maru Alezard",
      nameEs: "Maru Alezard",
      avatar: "MA",
      date: "7 months ago",
      rating: 5,
      content: "We had an unforgettable experience hosting my daughter's Quinceañera at Slice! Patty, the owner, is absolutely amazing—she's not only a fantastic host but also incredibly accommodating and flexible. She went above and beyond, offering great recommendations for other vendors that helped make the event even more special. The space was perfect, and the party was a total hit! My daughter had the best time, and we couldn't be happier with how everything turned out. We'll definitely be using Slice for future events. Highly recommend!",
      contentEs: "¡Tuvimos una experiencia inolvidable organizando la Quinceañera de mi hija en Slice! Patty, la propietaria, es absolutamente increíble: no solo es una anfitriona fantástica, sino también increíblemente complaciente y flexible. Fue más allá, ofreciendo excelentes recomendaciones para otros proveedores que ayudaron a hacer el evento aún más especial. El espacio era perfecto, ¡y la fiesta fue un éxito total! Mi hija se divirtió muchísimo, y no podríamos estar más felices con cómo resultó todo. Definitivamente usaremos Slice para eventos futuros. ¡Altamente recomendado!",
      hasPhotos: true,
      photoCount: 5,
      photos: [
        "/6_Testimonials/MaruAlezard/1.png",
        "/6_Testimonials/MaruAlezard/2.png",
        "/6_Testimonials/MaruAlezard/3.png",
        "/6_Testimonials/MaruAlezard/4.png",
        "/6_Testimonials/MaruAlezard/5.png"
      ]
    },
    {
      id: 47,
      name: "Catalina Palacios",
      nameEs: "Catalina Palacios",
      avatar: "CP",
      date: "10 months ago",
      rating: 5,
      content: "SLICE - Epic party! I celebrated my 50th birthday with Patty and her team. Everything in place, the food, the drinks, the service - ALL in ONE! Excellent people! Looking forward to celebrate again with you guys!",
      contentEs: "SLICE - ¡Fiesta épica! Celebré mi cumpleaños número 50 con Patty y su equipo. Todo en su lugar, la comida, las bebidas, el servicio: ¡TODO EN UNO! ¡Excelente gente! ¡Esperando celebrar de nuevo con ustedes!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 48,
      name: "Stephanie Stewart",
      nameEs: "Stephanie Stewart",
      avatar: "SS",
      date: "11 months ago",
      rating: 5,
      content: "We had our daughter's 16th birthday party at Slice and it was amazing! Slice took care of everything- we didn't have to worry about the small details as they had it all covered. The venue was modern, the food and drinks were delicious.",
      contentEs: "¡Tuvimos la fiesta de cumpleaños número 16 de nuestra hija en Slice y fue increíble! Slice se encargó de todo: no tuvimos que preocuparnos por los pequeños detalles ya que lo tenían todo cubierto. El lugar era moderno, la comida y las bebidas estaban deliciosas.",
      hasPhotos: true,
      photoCount: 3,
      photos: [
        "/6_Testimonials/StephanieStewart/1.png",
        "/6_Testimonials/StephanieStewart/2.png",
        "/6_Testimonials/StephanieStewart/3.png"
      ]
    },
    {
      id: 49,
      name: "Laura Tirado",
      nameEs: "Laura Tirado",
      avatar: "LT",
      date: "11 months ago",
      rating: 5,
      content: "Patty and her staff were extremely diligent, detailed and service oriented. I felt she went above and beyond to alleviate stress during the planning process. The space looked fantastic and all of her vendor recommendations were also wonderful, hardworking people. The food was very good and everyone seemed to have a blast! The perfect venue to celebrate my daughter's quince. We will definitely book there again for another celebratory milestone! Thanks so much for everything, Patty!",
      contentEs: "Patty y su personal fueron extremadamente diligentes, detallados y orientados al servicio. Sentí que fue más allá para aliviar el estrés durante el proceso de planificación. El espacio se veía fantástico y todas sus recomendaciones de proveedores también fueron personas maravillosas y trabajadoras. ¡La comida estaba muy buena y todos parecían divertirse muchísimo! El lugar perfecto para celebrar la quinceañera de mi hija. ¡Definitivamente reservaremos allí de nuevo para otro hito celebratorio! ¡Muchas gracias por todo, Patty!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 50,
      name: "Jill Smith",
      nameEs: "Jill Smith",
      avatar: "JS",
      date: "11 months ago",
      rating: 5,
      content: "We had the best time throwing my daughter's Bat Mitzvah at Slice! The event space, lighting, and furniture are all so amazing, there's not much else that needs to be added. Patty helped with every detail and ensured that our party was a success! We couldn't have asked for a better experience!",
      contentEs: "¡Tuvimos el mejor momento organizando el Bat Mitzvah de mi hija en Slice! El espacio del evento, la iluminación y los muebles son tan increíbles que no hay mucho más que necesite agregarse. ¡Patty ayudó con cada detalle y se aseguró de que nuestra fiesta fuera un éxito! ¡No podríamos haber pedido una mejor experiencia!",
      hasPhotos: true,
      photoCount: 3,
      photos: [
        "/6_Testimonials/JillSmith/1.png",
        "/6_Testimonials/JillSmith/2.png",
        "/6_Testimonials/JillSmith/3.png"
      ]
    },
    {
      id: 51,
      name: "Nicholas Wofsy",
      nameEs: "Nicholas Wofsy",
      avatar: "NW",
      date: "5 months ago",
      rating: 5,
      content: "We recently had our daughters Bat Mitzvah at Slice. Since the moment we met Patty(the owner) a few months ago she made us feel so comfortable and answered all of our questions. As months went on Patty was always available with helping me pick out our menu, bar, decorations etc. Slice was a great place for our party as we had about 60 people with DJ and dancers too! The food was absolutely delicious and Patty and her team were AMAZING to work with!! I would highly recommend this place if you are looking for great service, food and atmosphere for your event!!!",
      contentEs: "Recientemente tuvimos el Bat Mitzvah de nuestras hijas en Slice. Desde el momento en que conocimos a Patty (la propietaria) hace unos meses, nos hizo sentir tan cómodos y respondió todas nuestras preguntas. A medida que pasaron los meses, Patty siempre estuvo disponible para ayudarme a elegir nuestro menú, bar, decoraciones, etc. ¡Slice fue un gran lugar para nuestra fiesta ya que tuvimos alrededor de 60 personas con DJ y bailarines también! ¡La comida estaba absolutamente deliciosa y Patty y su equipo fueron INCREÍBLES para trabajar! ¡Recomendaría altamente este lugar si estás buscando gran servicio, comida y ambiente para tu evento!",
      hasPhotos: true,
      photoCount: 2,
      photos: [
        "/6_Testimonials/NicholasWofsy/1.png",
        "/6_Testimonials/NicholasWofsy/2.png"
      ]
    },
    {
      id: 52,
      name: "Deborah Horna",
      nameEs: "Deborah Horna",
      avatar: "DH",
      date: "1 year ago",
      rating: 5,
      content: "I want to the thank Patty and the rest of the Slice family for the beautiful Celebration of Life they prepared for my mom. Patty did an amazing job preparing the celebration of life within a week of my mom's passing. We were blessed that she had 1 day opened on her calendar. The celebration was meant to be here. During our 1 day meeting, Patty gave us her full attention as we explained our ideas on the preparations and we let her take control of everything and we are so happy we did! She went above and beyond our expectations! Patty made this process stress free for the family, the setup was beautifully decorated with my mom's favorite colors and food. The ambiance was lovely, the remembrance video played on several areas of the venue which was great to see everyone in the entire room enjoying the video. All the guests were in awe of how beautiful everything turned out. Thank you Patty for the amazing job. I highly recommend Slice Weston for your next event! The Horna Family",
      contentEs: "Quiero agradecer a Patty y al resto de la familia Slice por la hermosa Celebración de Vida que prepararon para mi mamá. Patty hizo un trabajo increíble preparando la celebración de vida dentro de una semana del fallecimiento de mi mamá. Fuimos bendecidos de que tuviera 1 día abierto en su calendario. La celebración estaba destinada a estar aquí. Durante nuestra reunión de 1 día, Patty nos dio toda su atención mientras explicábamos nuestras ideas sobre los preparativos y la dejamos tomar control de todo, ¡y estamos tan felices de haberlo hecho! ¡Fue más allá de nuestras expectativas! Patty hizo este proceso libre de estrés para la familia, la configuración estaba bellamente decorada con los colores y comida favoritos de mi mamá. El ambiente era encantador, el video de recuerdo se reprodujo en varias áreas del lugar, lo cual fue genial ver a todos en toda la habitación disfrutando del video. Todos los invitados estaban asombrados de lo hermoso que resultó todo. Gracias Patty por el trabajo increíble. ¡Recomiendo altamente Slice Weston para tu próximo evento! La Familia Horna",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 53,
      name: "Dr. Mayte Insua-Auais",
      nameEs: "Dra. Mayte Insua-Auais",
      avatar: "DM",
      date: "1 year ago",
      rating: 5,
      content: "We rented this location for my daughter's 15th birthday and it DID NOT disappoint! Everything was AWESOME! The owner went BEYOND her scope of responsibilities to help me plan a cool, untraditional quinceañera party. She went over everything meticulously with me, answered EVERY question (no matter how many times I asked), recommended vendors, and helped me feel at ease in planning such an event. I did not use any party planners so the process was overwhelming and Mrs. Patty Leon helped unconditionally from day 1. I cannot agree this enough. She was amazing in helping me determine food selections, decoration needs, music and entertainment vendors, etc. The food was tasty, the amount of food was perfect, drink options varied for the guests, and the guests went back for seconds (a good sign in my opinion). THANK YOU is not enough to say to this owner for her assistance helped me give my daughter an unforgettable evening of memories and fun. Highly recommended location.",
      contentEs: "¡Alquilamos este lugar para el cumpleaños número 15 de mi hija y NO defraudó! ¡Todo fue INCREÍBLE! La propietaria fue MÁS ALLÁ de su alcance de responsabilidades para ayudarme a planificar una fiesta de quinceañera genial y no tradicional. Revisó todo meticulosamente conmigo, respondió CADA pregunta (no importa cuántas veces pregunté), recomendó proveedores y me ayudó a sentirme tranquila al planificar tal evento. No usé ningún planificador de fiestas, así que el proceso fue abrumador y la Sra. Patty Leon ayudó incondicionalmente desde el día 1. No puedo estar más de acuerdo con esto. Fue increíble ayudándome a determinar selecciones de comida, necesidades de decoración, proveedores de música y entretenimiento, etc. La comida estaba sabrosa, la cantidad de comida era perfecta, las opciones de bebidas variaban para los invitados, y los invitados regresaron por segundos (una buena señal en mi opinión). GRACIAS no es suficiente para decirle a esta propietaria por su asistencia me ayudó a darle a mi hija una noche inolvidable de recuerdos y diversión. Lugar altamente recomendado.",
      hasPhotos: true,
      photoCount: 3,
      photos: [
        "/6_Testimonials/DrMayteInsuaAuais/1.png",
        "/6_Testimonials/DrMayteInsuaAuais/2.png",
        "/6_Testimonials/DrMayteInsuaAuais/3.png"
      ]
    },
    {
      id: 54,
      name: "Bruce Supanik",
      nameEs: "Bruce Supanik",
      avatar: "BS",
      date: "1 year ago",
      rating: 5,
      content: "Very helpful and professional staff and beautiful location",
      contentEs: "Personal muy servicial y profesional y hermoso lugar",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 55,
      name: "Anyelin Orellanes",
      nameEs: "Anyelin Orellanes",
      avatar: "AO",
      date: "1 year ago",
      rating: 5,
      content: "I had the most wonderful birthday party for my boyfriend . Patty was so helpful and so kind to me through the entire process. The party was a success , the planning was so much easier with Patty help and all the guest had something positive to say about the food, drinks and location!",
      contentEs: "Tuve la fiesta de cumpleaños más maravillosa para mi novio. Patty fue tan servicial y tan amable conmigo durante todo el proceso. La fiesta fue un éxito, la planificación fue mucho más fácil con la ayuda de Patty y todos los invitados tuvieron algo positivo que decir sobre la comida, bebidas y el lugar!",
      hasPhotos: true,
      photoCount: 1,
      photos: [
        "/6_Testimonials/AnyelinOrellanes/1.png"
      ]
    },
    {
      id: 56,
      name: "Roxie Martinez",
      nameEs: "Roxie Martínez",
      avatar: "RM",
      date: "1 year ago",
      rating: 5,
      content: "The establishment was well decorated and the atmosphere was great.",
      contentEs: "El establecimiento estaba bien decorado y el ambiente era genial.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 57,
      name: "Marianela Bagnulo",
      nameEs: "Marianela Bagnulo",
      avatar: "MB",
      date: "1 year ago",
      rating: 5,
      content: "Last night we celebrated our daughter 15th birthday in Slice Events everything was wonderful food, drinks,music Dj Joe from JS entertainment was awesome. Also the photographer,videographer were very nice and professionals.",
      contentEs: "Anoche celebramos el cumpleaños número 15 de nuestra hija en Slice Events, todo fue maravilloso: comida, bebidas, música. DJ Joe de JS entertainment fue increíble. También el fotógrafo y videógrafo fueron muy agradables y profesionales.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 58,
      name: "Lisa Hoo",
      nameEs: "Lisa Hoo",
      avatar: "LH",
      date: "2 years ago",
      rating: 5,
      content: "Slice Weston was everything and more for Mikie's 60th birthday party! Patty, thank you for delivering a first class party! Your team was unbelievable! My guests and I were blown away by their services throughout the night, professional yet personable.",
      contentEs: "¡Slice Weston fue todo y más para la fiesta de cumpleaños número 60 de Mikie! ¡Patty, gracias por entregar una fiesta de primera clase! ¡Tu equipo fue increíble! Mis invitados y yo quedamos impresionados por sus servicios durante toda la noche, profesionales pero personales.",
      hasPhotos: true,
      photoCount: 1,
      photos: [
        "/6_Testimonials/LisaHoo/1.png"
      ]
    },
    {
      id: 59,
      name: "Lucy Bourached",
      nameEs: "Lucy Bourached",
      avatar: "LB",
      date: "3 years ago",
      rating: 5,
      content: "The best place to host your party. The best service. 100% recommended. Thank you so much, Pati, for your attention. Slice is the best.",
      contentEs: "El mejor lugar para organizar tu fiesta. El mejor servicio. 100% recomendado. Muchas gracias, Pati, por tu atención. Slice es lo mejor.",
      hasPhotos: true,
      photoCount: 14,
      photos: [
        "/6_Testimonials/LucyBourached/1.png",
        "/6_Testimonials/LucyBourached/2.png",
        "/6_Testimonials/LucyBourached/3.png",
        "/6_Testimonials/LucyBourached/4.png",
        "/6_Testimonials/LucyBourached/5.png",
        "/6_Testimonials/LucyBourached/6.png",
        "/6_Testimonials/LucyBourached/7.png",
        "/6_Testimonials/LucyBourached/8.png",
        "/6_Testimonials/LucyBourached/9.png",
        "/6_Testimonials/LucyBourached/10.png",
        "/6_Testimonials/LucyBourached/11.png",
        "/6_Testimonials/LucyBourached/12.png",
        "/6_Testimonials/LucyBourached/13.png",
        "/6_Testimonials/LucyBourached/14.png"
      ]
    },
    {
      id: 60,
      name: "Ricardo Rodriguez",
      nameEs: "Ricardo Rodríguez",
      avatar: "RR",
      date: "7 years ago",
      rating: 5,
      content: "A spacious venue for parties and celebrations, easy and convenient to access; complemented by well-equipped restrooms and attentive service from the staff. A great experience.",
      contentEs: "Un lugar espacioso para fiestas y celebraciones, fácil y conveniente de acceder; complementado por baños bien equipados y servicio atento del personal. Una gran experiencia.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 61,
      name: "Kathleen Bruce",
      nameEs: "Kathleen Bruce",
      avatar: "KB",
      date: "5 years ago",
      rating: 5,
      content: "Nice place for a wedding",
      contentEs: "Buen lugar para una boda",
      hasPhotos: true,
      photoCount: 119,
      photos: [
        "/6_Testimonials/KathleenBruce/1.png",
        "/6_Testimonials/KathleenBruce/2.png",
        "/6_Testimonials/KathleenBruce/3.png",
        "/6_Testimonials/KathleenBruce/4.png",
        "/6_Testimonials/KathleenBruce/5.png"
      ]
    },
    {
      id: 62,
      name: "Daniel Orozco",
      avatar: "DO",
      date: "1 year ago",
      rating: 5,
      content: "Excellent service, nice staff.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 63,
      name: "Erik Olivares",
      avatar: "EO",
      date: "1 year ago",
      rating: 5,
      content: "Excellent place for family events.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 64,
      name: "Joaquin Lammoglia",
      avatar: "JL",
      date: "1 year ago",
      rating: 5,
      content: "Excellent for a big party.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 65,
      name: "Damian Medina",
      avatar: "DM",
      date: "1 year ago",
      rating: 5,
      content: "Excellent attention.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 66,
      name: "Brian Desiderio",
      avatar: "BD",
      date: "1 year ago",
      rating: 5,
      content: "Fantastic place for any type of event!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 67,
      name: "Luis Rivera",
      avatar: "LR",
      date: "1 year ago",
      rating: 5,
      content: "Excellent service and organization.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 68,
      name: "Carlos Salazar",
      avatar: "CS",
      date: "1 year ago",
      rating: 5,
      content: "Beautiful place for any event.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 69,
      name: "Karina Hernandez",
      avatar: "KH",
      date: "1 year ago",
      rating: 5,
      content: "Wonderful place to host parties.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 70,
      name: "Eduardo Martinez",
      avatar: "EM",
      date: "1 year ago",
      rating: 5,
      content: "Great service and atmosphere.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 71,
      name: "Gina DiCocco",
      avatar: "GD",
      date: "2 years ago",
      rating: 5,
      content: "Very nice venue, perfect for parties.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 72,
      name: "Jose Diaz",
      avatar: "JD",
      date: "2 years ago",
      rating: 5,
      content: "Excellent venue with friendly staff.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 73,
      name: "Carolina Orozco",
      avatar: "CO",
      date: "2 years ago",
      rating: 5,
      content: "Loved the place, great service.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 74,
      name: "Monica Reyes",
      avatar: "MR",
      date: "2 years ago",
      rating: 5,
      content: "Fantastic location for family events.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 75,
      name: "Maria Lopez",
      avatar: "ML",
      date: "2 years ago",
      rating: 5,
      content: "Great place for any celebration.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 76,
      name: "Alberto Gonzalez",
      avatar: "AG",
      date: "3 years ago",
      rating: 5,
      content: "Perfect for birthdays and family gatherings.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 77,
      name: "Robert Smith",
      avatar: "RS",
      date: "3 years ago",
      rating: 5,
      content: "Excellent environment and staff.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 78,
      name: "Pedro Sanchez",
      avatar: "PS",
      date: "3 years ago",
      rating: 5,
      content: "Highly recommend for private events.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 79,
      name: "Alejandra Ruiz",
      avatar: "AR",
      date: "3 years ago",
      rating: 5,
      content: "Lovely place to host parties.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 80,
      name: "Stephanie Taylor",
      avatar: "ST",
      date: "3 years ago",
      rating: 5,
      content: "Amazing place for celebrations.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 81,
      name: "Jaron Cumberbatch",
      avatar: "JC",
      date: "7 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 82,
      name: "Mariano Aponte",
      avatar: "MA",
      date: "7 years ago",
      rating: 5,
      content: "Great night with friends! Excellent staff, music, quality food and drinks. Highly recommended.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 83,
      name: "N T G.",
      avatar: "NT",
      date: "7 years ago",
      rating: 5,
      content: "What a fun place. Went here for a family event. Great for kids, teens, tweens, and others. They offer many options. The food was amazing. Couches, chairs, tables, and high-top tables. Great TV/video monitors. Sound system was loud, but allowed for conversations at a normal tone. The party we went to had air hockey, ping pong, and a video game system.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 84,
      name: "Nayibe V Heyaime-Martorell",
      avatar: "NH",
      date: "7 years ago",
      rating: 5,
      content: "Beautiful atmosphere.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 85,
      name: "Sebastian Leyes",
      avatar: "SL",
      date: "7 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 86,
      name: "Alex Pino",
      avatar: "AP",
      date: "7 years ago",
      rating: 5,
      content: "Nice party place.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 87,
      name: "Michelle Rosen",
      avatar: "MR",
      date: "7 years ago",
      rating: 5,
      content: "Keith and the entire team made my daughter's Sweet 16 so easy. They really were great to work with and followed through on their promise to make it a terrific party. The venue was perfect and the food was awesome! The team was so professional and worked effortlessly with the huge horde of teenagers and young-at-heart adults! I would highly recommend Slice to anyone!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 88,
      name: "Brittany Ibrahim",
      avatar: "BI",
      date: "8 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 89,
      name: "Nicole Culverhouse",
      avatar: "NC",
      date: "8 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 90,
      name: "Pablo Padrón",
      avatar: "PP",
      date: "8 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 91,
      name: "Ethan Masel",
      avatar: "EM",
      date: "8 years ago",
      rating: 5,
      content: "I have been here for several parties and have loved every one!",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 92,
      name: "Mario Morera",
      avatar: "MM",
      date: "8 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 93,
      name: "Jorge",
      avatar: "JO",
      date: "9 years ago",
      rating: 5,
      content: "",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 94,
      name: "Joanna Collantes",
      avatar: "JC",
      date: "9 years ago",
      rating: 5,
      content: "The party was spectacular! Excellent service and food! Patty is a very dedicated person, she loves her job. I'm very grateful and happy.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 95,
      name: "William Blandin",
      avatar: "WB",
      date: "9 years ago",
      rating: 5,
      content: "We had our daughter's Quinceañera party at Slice and to be honest I was greatly impressed by the prompt, professional, and dedicated support we got from Patty through the entire process. The place itself is amazing—the location (right in Weston), the set of lights available, the furniture included, food, service, and everything else needed for our party was perfect with no pressures, drama, or trying to upsell additional services in any way. I did my research comparing a few other places to hold our party (ballrooms, renting a space and bringing everything for decoration and catering, doing it at home, etc.), and at the end in terms of value for a 50–60 people party including all our needs, Slice was our best option by far. Our night was absolutely perfect, my daughter had exactly the party she had in mind, my wife and I had the chance to enjoy the evening with our guests, and everyone complimented us for such an amazing and unforgettable evening. Honestly I'm making sure everyone I know who is planning an event will hear about my experience there. Thanks Patty for all your dedication and patience during the preparation process and I hope your business keeps growing and making more families have an awesome experience at your place.",
      hasPhotos: false,
      photoCount: 0,
      photos: []
    },
    {
      id: 96,
      name: "Mary Josefina Escalona Olivares",
      avatar: "MJ",
      date: "5 years ago",
      rating: 5,
      content: "EXCELLENT",
      hasPhotos: true,
      photoCount: 1,
      photos: [
        "/6_Testimonials/MaryJosefinaEscalonaOlivares/1.png"
      ]
    }
  ];

  // Filter and sort reviews based on selected options
  const filteredReviews = showPhotosOnly 
    ? allReviews.filter(review => review.hasPhotos && review.photos && review.photos.length > 0)
    : allReviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    try {
      const dateA = a.date instanceof Date ? a.date : parseDate(a.date);
      const dateB = b.date instanceof Date ? b.date : parseDate(b.date);
      
      if (sortOrder === 'newest') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    } catch (error) {
      console.error('Error sorting reviews:', error);
      return 0; // fallback - no change in order
    }
  });

  const displayedReviews = sortedReviews;

  return (
    <div className="testimonials-page">
      {/* Featured Google Reviews */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">{t('testimonials.featuredReviews.title')}</h2>
            <p className="section-subtitle">
              {t('testimonials.featuredReviews.subtitle')}
            </p>
          </div>
          
          <div className="google-button-container-top">
            <a
              href="https://www.google.com/maps/place/Slice+LLC/@26.138949,-80.4227998,17z/data=!3m1!4b1!4m6!3m5!1s0x88d90ae4d087e281:0xdf66f23c9b96c8e8!8m2!3d26.138949!4d-80.420625!16s%2Fg%2F11c0q8q8q8"
              target="_blank"
              rel="noopener noreferrer"
              className="google-view-button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>{t('testimonials.googleReviews.viewOnGoogle')}</span>
            </a>
          </div>
          
          {/* Filter Section */}
          <div className="filter-container">
            <div className="filter-label">
              <span>Sort reviews:</span>
          </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${sortOrder === 'newest' ? 'active' : ''}`}
                onClick={() => setSortOrder('newest')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14l5-5 5 5z"/>
                </svg>
                {t('testimonials.sort.newest')}
              </button>
                    <button
                className={`filter-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
                onClick={() => setSortOrder('oldest')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
                {t('testimonials.sort.oldest')}
                    </button>
              <button
                className={`filter-btn ${showPhotosOnly ? 'active' : ''}`}
                onClick={() => setShowPhotosOnly(!showPhotosOnly)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                {t('testimonials.filter.photosOnly')}
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list">
            {displayedReviews.map((review) => {
              const localizedReview = getLocalizedReview(review);
              return (
                <div key={review.id} className={`review-list-item ${localizedReview.content === '' ? 'review-compact' : ''}`}>
                <div className="review-content-wrapper">
                  <div className="review-text-section">
                    <div className="review-list-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{localizedReview.avatar}</div>
                        <div className="reviewer-details">
                          <div className="reviewer-name">{localizedReview.name}</div>
                          <div className="review-date">{getTimeAgo(localizedReview.date)}</div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={`star ${index < review.rating ? 'filled' : 'empty'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    {localizedReview.content !== '' && (
                      <div className="review-content">
                        <p>{localizedReview.content}</p>
                      </div>
                    )}
                  </div>

                  {/* Photos Section */}
                  {review.hasPhotos && review.photos && (
                    <div className="review-photos-section">
                      <div className="review-photos-grid">
                        {review.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="review-photo"
                            onClick={() => openPhotoViewer(review.photos, index)}
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              src={`${(import.meta as any).env?.BASE_URL || '/'}${photo.replace(/^\//,'')}`}
                              alt={`${review.name}'s event photo ${index + 1}`}
                              className="review-photo-img"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Create a data URI for a simple placeholder image
                                const canvas = document.createElement('canvas');
                                canvas.width = 200;
                                canvas.height = 150;
                                const ctx = canvas.getContext('2d');
                                if (ctx) {
                                  ctx.fillStyle = '#1a1a1a';
                                  ctx.fillRect(0, 0, 200, 150);
                                  ctx.fillStyle = '#ffffff';
                                  ctx.font = '14px Arial';
                                  ctx.textAlign = 'center';
                                  ctx.fillText(`Photo ${index + 1}`, 100, 75);
                                }
                                target.src = canvas.toDataURL();
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section bg-slice-primary text-white">
        <div className="container text-center">
          <h2 className="section-title text-white mb-4">Ready to Experience Slice?</h2>
          <p className="section-subtitle text-white mb-8">
            Join our satisfied customers and create unforgettable memories at Slice Weston
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:954-557-7086" className="btn btn-outline border-white text-white hover:bg-white hover:text-slice-primary">
              Call (954) 557-7086
            </a>
            <a
              href="https://www.google.com/maps/place/Slice+LLC/@26.138949,-80.4227998,17z/data=!3m1!4b1!4m6!3m5!1s0x88d90ae4d087e281:0xdf66f23c9b96c8e8!8m2!3d26.138949!4d-80.420625!16s%2Fg%2F11c0q8q8q8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-slice-primary"
            >
              <i className="fab fa-google mr-2"></i>
              Leave a Review
            </a>
          </div>
        </div>
      </section>

      {/* Custom Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleLightboxClose}
        >
          <div className="relative max-w-7xl max-h-full w-full">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 transition-all"
              onClick={handleLightboxClose}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mobile Portrait Layout */}
            <div className="flex flex-col items-center sm:hidden h-full">
              {/* Main Image Container - Fixed Height */}
              <div 
                className="w-full h-[60vh] flex items-center justify-center mb-4 relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={currentReviewPhotos[selectedPhotoIndex]}
                  alt={`Review photo ${selectedPhotoIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Auto Play Button */}
                <button
                  className={`auto-play-button ${isAutoPlaying ? 'auto-playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAutoPlay();
                  }}
                >
                  {isAutoPlaying ? 'Stop' : 'Auto'}
                </button>
                
                {/* Photo Counter */}
                <div className="photo-counter photo-counter-overlay">
                  {selectedPhotoIndex + 1} of {currentReviewPhotos.length}
                </div>
              </div>

              {/* Thumbnail Strip - Fixed Height Container */}
              <div className="w-full h-20 flex items-center justify-center">
                <div className="flex space-x-2 max-w-full overflow-x-auto px-4">
                  {currentReviewPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                        index === selectedPhotoIndex ? 'border-white' : 'border-transparent opacity-60'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Landscape Layout */}
            <div className="hidden sm:flex lg:hidden items-center gap-4 h-full">
              {/* Left Side - Thumbnail Navigation */}
              <div className="w-32 flex flex-col items-center h-full">
                <div className="flex flex-col space-y-2 flex-1 overflow-y-auto pr-1 pt-2">
                  {currentReviewPhotos.slice(thumbnailStartIndex, thumbnailStartIndex + 4).map((photo, index) => {
                    const actualIndex = thumbnailStartIndex + index;
                    return (
                      <img
                        key={actualIndex}
                        src={photo}
                        alt={`Review photo ${actualIndex + 1}`}
                        className={`w-full h-12 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                          actualIndex === selectedPhotoIndex ? 'border-white' : 'border-transparent opacity-60'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(actualIndex);
                        }}
                      />
                    );
                  })}
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex space-x-2 mt-3">
                  {thumbnailStartIndex > 0 && (
                    <button
                        className="nav-arrow-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleThumbnailNavigation('prev');
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {thumbnailStartIndex + 4 < currentReviewPhotos.length && (
                    <button
                        className="nav-arrow-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleThumbnailNavigation('next');
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side - Main Image Container */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div 
                  className="w-full h-[80vh] flex items-center justify-center relative"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img 
                    src={currentReviewPhotos[selectedPhotoIndex]}
                    alt={`Review photo ${selectedPhotoIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Auto Play Button */}
                  <button
                    className={`auto-play-button ${isAutoPlaying ? 'auto-playing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutoPlay();
                    }}
                  >
                    {isAutoPlaying ? 'Stop' : 'Auto'}
                  </button>
                  
                  {/* Photo Counter */}
                  <div className="photo-counter photo-counter-overlay">
                    {selectedPhotoIndex + 1} of {currentReviewPhotos.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Landscape Layout */}
            <div className="hidden lg:flex items-center gap-6 h-full">
              {/* Left Side - Main Image Container - Fixed Height */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div 
                  className="w-full h-[75vh] flex items-center justify-center relative"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img 
                    src={currentReviewPhotos[selectedPhotoIndex]}
                    alt={`Review photo ${selectedPhotoIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Auto Play Button */}
                  <button
                    className={`auto-play-button ${isAutoPlaying ? 'auto-playing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutoPlay();
                    }}
                  >
                    {isAutoPlaying ? 'Stop' : 'Auto'}
                  </button>
                  
                  {/* Photo Counter */}
                  <div className="photo-counter photo-counter-overlay">
                    {selectedPhotoIndex + 1} of {currentReviewPhotos.length}
                  </div>
                </div>
              </div>

              {/* Right Side - Thumbnail Navigation - Fixed Height */}
              <div className="w-48 flex flex-col items-center h-[80vh]">
                <div className="flex flex-col space-y-2 flex-1 overflow-y-auto pr-2 pt-2">
                  {currentReviewPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                        index === selectedPhotoIndex ? 'border-white' : 'border-transparent opacity-60'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex(index);
                      }}
                    />
                  ))}
                </div>
                
                {/* Desktop Navigation Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button
                      className="nav-arrow-button nav-arrow-button-desktop"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(Math.max(0, selectedPhotoIndex - 1));
                    }}
                    disabled={selectedPhotoIndex === 0}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                      className="nav-arrow-button nav-arrow-button-desktop"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(Math.min(currentReviewPhotos.length - 1, selectedPhotoIndex + 1));
                    }}
                    disabled={selectedPhotoIndex === currentReviewPhotos.length - 1}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;