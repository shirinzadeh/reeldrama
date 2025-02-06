import connectToDatabase from '~/server/utils/database';
import Movie from '~/server/models/Movie';
import Category from '~/server/models/Category';
import Episode from '~/server/models/Episode';
import mongoose from 'mongoose';
import Package from '~/server/models/Package';
import Language from '~/server/models/language';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const shouldClear = query.clear === 'true';
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) {
    return { success: false, message: 'Seeding is only allowed in the development environment' };
  }

  await connectToDatabase();

  try {
    if (shouldClear) {
      await Promise.all([
        Category.deleteMany({}),
        Movie.deleteMany({}),
        Episode.deleteMany({}),
        Package.deleteMany({}),
        Language.deleteMany({})
      ]);
      console.log('Cleared existing data');
    }

    // Seed Languages
    const languages = [
      {
        code: 'en',
        name: 'English',
        native: 'English',
        isActive: true,
        isDefault: true
      },
      {
        code: 'tr',
        name: 'Turkish',
        native: 'Türkçe',
        isActive: true,
        isDefault: false
      },
      {
        code: 'ar',
        name: 'Arabic',
        native: 'العربية',
        isActive: false,
        isDefault: false
      }
    ];

    for (const languageData of languages) {
      await Language.findOneAndUpdate(
        { code: languageData.code },
        languageData,
        { upsert: true, new: true }
      );
      console.log(`Upserted language: ${languageData.name}`);
    }

    // Add this before the existing seed data
    const packages = [
      {
        id: 1,
        coins: 1300,
        bonus: 1300,
        bonusPercentage: 100,
        price: 12.99,
        isNewUserOnly: true,
        isActive: true
      },
      {
        id: 2,
        coins: 500,
        bonus: 0,
        bonusPercentage: 0,
        price: 4.99,
        isActive: true
      },
      {
        id: 3,
        coins: 1000,
        bonus: 150,
        bonusPercentage: 15,
        price: 9.99,
        isActive: true
      },
      {
        id: 4,
        coins: 1500,
        bonus: 300,
        bonusPercentage: 20,
        price: 14.99,
        isActive: true
      },
      {
        id: 5,
        coins: 2500,
        bonus: 875,
        bonusPercentage: 35,
        price: 24.99,
        isActive: true
      },
      {
        id: 6,
        coins: 5000,
        bonus: 2500,
        bonusPercentage: 50,
        price: 49.99,
        isActive: true
      },
      {
        id: 7,
        coins: 10000,
        bonus: 10000,
        bonusPercentage: 100,
        price: 99.99,
        isActive: true
      }
    ];

    for (const packageData of packages) {
      await Package.findOneAndUpdate(
        { id: packageData.id },
        packageData,
        { upsert: true, new: true }
      );
      console.log(`Upserted package: ${packageData.id}`);
    }

    // Seed Categories
    const categories = [
      { 
      name: { en: 'New Release', tr: 'Yeni Çıkan', ar: 'إصدار جديد' }, 
      slug: 'new-release', 
      icon: '🎬' 
      },
      { 
      name: { en: 'Secret Identity', tr: 'Gizli Kimlik', ar: 'هوية سرية' }, 
      slug: 'secret-identity', 
      icon: '🕵️‍♂️' 
      },
      { 
      name: { en: 'Love & Betrayal', tr: 'Aşk ve İhanet', ar: 'حب وخيانة' }, 
      slug: 'love-and-betrayal', 
      icon: '💘' 
      },
      { 
      name: { en: 'Billionaire Romance', tr: 'Milyarder Romantizmi', ar: 'رومانسية الملياردير' }, 
      slug: 'billionaire-romance', 
      icon: '🌏' 
      },
      { 
      name: { en: 'Asian', tr: 'Asya', ar: 'آسيوي' }, 
      slug: 'asian', 
      icon: '♻️' 
      },
    ];

    for (const category of categories) {
      await Category.findOneAndUpdate(
        { slug: category.slug },
        category,
        { upsert: true, new: true }
      );
      console.log(`Upserted category: ${category.name.en}`);
    }

    // Seed Movies
    const sampleMovies = [
      {
        title: {
          en: "Billionaire's Love in Danger",
          tr: "Milyarderin Tehlikeli Aşkı",
          ar: "حب الملياردير في خطر"
        },
        description: {
          en: "When a powerful billionaire crosses paths with an ordinary woman, sparks fly and secrets unravel at every turn...",
          tr: "Güçlü bir milyarder sıradan bir kadınla karşılaştığında, kıvılcımlar uçuşur ve her adımda sırlar açığa çıkar...",
          ar: "عندما يتقاطع طريق ملياردير قوي مع امرأة عادية، تتطاير الشرار وتنكشف الأسرار في كل منعطف..."
        },
        tags: ['Romance', 'Drama'],
        category: 'billionaire-romance',
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/billionaire's-love-in-danger.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/billionaire's-love-in-danger.webp",
        releaseDate: new Date('2024-12-01'),
        isFeatured: true,
        totalEpisodes: 13,
        freeEpisodes: 5
      },
      {
        title: {
          en: "It's Obvious that You Love Me",
          tr: "Beni Sevdiğin Çok Belli",
          ar: "من الواضح أنك تحبني"
        },
        description: {
          en: "When an unlikely pair meets, the chemistry between them is impossible to ignore...",
          tr: "Beklenmedik bir çift karşılaştığında, aralarındaki kimya göz ardı edilemez...",
          ar: "عندما يلتقي زوجان غير متوقعين، يصبح من المستحيل تجاهل الكيمياء بينهما..."
        },
        tags: ['Romance', 'Comedy'],
        category: 'billionaire-romance',
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/it’s-obvious-that-you-love-me.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/it’s-obvious-that-you-love-me.webp",
        releaseDate: new Date('2024-12-15'),
        isFeatured: false,
        totalEpisodes: 7,
        freeEpisodes: 3
      },
      {
        title: {
          en: "My Blind Husband is a Billionaire",
          tr: "Kör Kocam Bir Milyarder",
          ar: "زوجي الأعمى ملياردير"
        },
        description: {
          en: "After a life-changing accident, a reclusive billionaire loses his sight and isolates himself from the outside world. When fate brings a determined caregiver into his life, she challenges his notions of independence and trust. Their relationship blossoms amidst daily struggles, from navigating physical obstacles to confronting emotional scars. He learns that love can be the greatest guide, even when darkness surrounds you. In rediscovering hope and purpose, they find that true wealth lies in the bonds of the heart.",
          tr: "Hayat değiştiren bir kazadan sonra, içine kapanık bir milyarder görme yetisini kaybeder ve dış dünyadan izole olur. Kader, kararlı bir bakıcıyı hayatına getirdiğinde, bağımsızlık ve güven kavramlarını sorgular. İlişkileri günlük mücadeleler arasında filizlenir, fiziksel engelleri aşmaktan duygusal yaralarla yüzleşmeye kadar. Karanlık sizi sardığında bile sevginin en büyük rehber olabileceğini öğrenir. Umut ve amacı yeniden keşfederken, gerçek zenginliğin kalbin bağlarında yattığını bulurlar.",
          ar: "بعد حادثة غيرت حياته، يفقد ملياردير منعزل بصره ويعزل نفسه عن العالم الخارجي. عندما يجلب القدر مربية مصممة إلى حياته، تتحدى مفاهيمه عن الاستقلال والثقة. تزدهر علاقتهما وسط النضالات اليومية، من التنقل في العقبات الجسدية إلى مواجهة الندوب العاطفية. يتعلم أن الحب يمكن أن يكون أعظم دليل، حتى عندما يحيطك الظلام. في إعادة اكتشاف الأمل والهدف، يجدون أن الثروة الحقيقية تكمن في روابط القلب."
        },
        tags: ['Romance', 'Drama'],
        category: 'billionaire-romance',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-blind-husband-is-a-billionaire.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-blind-husband-is-a-billionaire.webp',
        releaseDate: new Date('2024-11-20'),
        isFeatured: true,
        totalEpisodes: 19,
        freeEpisodes: 5
      },
      {
        title: {
          en: "Secrets of the Amnesia Billionaire",
          tr: "Amnezi Milyarderinin Sırları",
          ar: "أسرار الملياردير المصاب بفقدان الذاكرة"
        },
        description: {
          en: "When a billionaire businessman wakes up without any memory of his past, he embarks on a quest to rediscover his identity. Along the way, he encounters a fierce yet compassionate woman who holds the key to his forgotten life. Intrigue unfolds as cryptic messages and hidden agendas surface, threatening to derail his search for truth. Amid the mounting tension, an unexpected romance takes root, defying the dangers that circle them. Together, they uncover secrets that not only change his future but also redefine what he believes about love, trust, and second chances.",
          tr: "Bir milyarder iş adamı geçmişine dair hiçbir anısı olmadan uyandığında, kimliğini yeniden keşfetmek için bir yolculuğa çıkar. Yol boyunca, unutulmuş hayatının anahtarını elinde tutan şiddetli ama şefkatli bir kadınla karşılaşır. Gizemli mesajlar ve gizli gündemler ortaya çıktıkça, gerçeği arayışını rayından çıkarmakla tehdit eder. Artan gerilim ortasında, beklenmedik bir romantizm kök salarak onları çevreleyen tehlikelere meydan okur. Birlikte, sadece geleceğini değiştirmekle kalmayıp, aşk, güven ve ikinci şanslar hakkında inandıklarını yeniden tanımlayan sırları ortaya çıkarırlar.",
          ar: "عندما يستيقظ رجل أعمال ملياردير دون أي ذاكرة عن ماضيه، ينطلق في رحلة لاكتشاف هويته من جديد. على طول الطريق، يلتقي بامرأة شرسة ولكنها رحيمة تحمل مفتاح حياته المنسية. تتكشف المؤامرات مع ظهور رسائل غامضة وأجندات خفية، مهددة بإخراج بحثه عن الحقيقة عن مساره. وسط التوتر المتزايد، تتجذر رومانسية غير متوقعة، متحدية الأخطار التي تحيط بهم. معًا، يكشفون أسرارًا لا تغير مستقبله فحسب، بل تعيد تعريف ما يؤمن به عن الحب والثقة والفرص الثانية."
        },
        tags: ['Romance', 'Mystery'],
        category: 'billionaire-romance',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secrets-of-the-amnesia-billionaire.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secrets-of-the-amnesia-billionaire.webp',
        releaseDate: new Date('2024-10-10'),
        isFeatured: false,
        totalEpisodes: 11,
        freeEpisodes: 3
      },
      {
        title: {
          en: 'The Shy Beauty and the Billionaire Beast',
          tr: 'Utangaç Güzel ve Milyarder Canavar',
          ar: 'الجميلة الخجولة والوحش المليادير'
        },
        description: {
          en: "Quiet and timid, she lives a humble life far removed from high society's glare. Fate, however, thrusts her into the path of a ruthless billionaire with a reputation as cold as ice. As she navigates his palatial estate and the secrets that lurk in its corridors, she discovers a wounded man beneath the beastly exterior. Their relationship grows through hesitant steps of trust, kind gestures, and late-night confessions. Ultimately, their tender bond reveals that love can bloom in even the unlikeliest places, transcending fear and prejudice.",
          tr: "Sessiz ve ürkek, yüksek sosyetenin parıltısından uzak mütevazı bir hayat yaşıyor. Ancak kader, onu buz kadar soğuk bir üne sahip acımasız bir milyarderin yoluna çıkarır. Görkemli malikanesinde ve koridorlarında gizlenen sırlar arasında gezinirken, canavarca dış görünüşün altında yaralı bir adam keşfeder. İlişkileri, güvenin tereddütlü adımları, nazik jestler ve gece itirafları ile büyür. Sonunda, hassas bağları, aşkın en beklenmedik yerlerde bile açabileceğini ve korku ve önyargıları aşabileceğini gösterir.",
          ar: "هادئة وخجولة، تعيش حياة متواضعة بعيدة عن أضواء المجتمع الراقي. لكن القدر يدفعها في طريق ملياردير قاسي يتمتع بسمعة باردة كالجليد. بينما تتنقل في قصره الفخم والأسرار الكامنة في ممراته، تكتشف رجلاً جريحاً تحت المظهر الوحشي. تنمو علاقتهما من خلال خطوات مترددة من الثقة والإيماءات اللطيفة واعترافات منتصف الليل. في النهاية، يكشف رباطهما الرقيق أن الحب يمكن أن يزدهر حتى في أكثر الأماكن استبعاداً، متجاوزاً الخوف والتحيز"
        },
        tags: ['Romance', 'Fantasy'],
        category: 'billionaire-romance',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-shy-beauty-and-the-billionaire-beast.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/the-shy-beauty-and-the-billionaire-beast.webp',
        releaseDate: new Date('2024-09-05'),
        isFeatured: true,
        totalEpisodes: 16,
        freeEpisodes: 5
      },
      {
        title: {
          en: 'Delivering Love',
          tr: 'Aşkı Teslim Etmek',
          ar: 'توصيل الحب'
        },
        description: {
          en: "Every dawn, a dedicated courier sets out to deliver packages and warm smiles across the bustling city...",
          tr: "Her şafakta, özverili bir kurye, kalabalık şehir boyunca paketler ve sıcak gülümsemeler dağıtmak için yola çıkar...",
          ar: "في كل فجر، ينطلق ساعي بريد متفانٍ لتوصيل الطرود والابتسامات الدافئة عبر المدينة المزدحمة..."
        },
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/delivering-love.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/delivering-love.webp',
        releaseDate: new Date('2024-08-25'),
        isFeatured: false,
        totalEpisodes: 9,
        freeEpisodes: 3
      },
      {
        title: {
          en: 'My Favorite Savior',
          tr: 'Favori Kurtarıcım',
          ar: 'منقذي المفضل'
        },
        description: {
          en: "When tragedy strikes, she finds her life in disarray, desperate for hope and direction. In her darkest hour, a selfless stranger saves her from danger, vanishing before she can express her gratitude. Determined to find him, she follows clues that lead to an unexpected world filled with hidden burdens. Their reunion sparks not just fond remembrance, but a shared desire to conquer personal demons. Through unwavering support and heartfelt kindness, they realize that sometimes the greatest rescue comes in the form of enduring love.",
          tr: "Trajedi vurduğunda, hayatını karmakarışık bulur, umut ve yön arayışı içinde çaresizdir. En karanlık anında, özverili bir yabancı onu tehlikeden kurtarır ve teşekkür edemeden kaybolur. Onu bulmaya kararlı olan kadın, gizli yüklerle dolu beklenmedik bir dünyaya götüren ipuçlarını takip eder. Yeniden buluşmaları sadece güzel anıları değil, kişisel şeytanları yenme arzusunu da ateşler. Sarsılmaz destek ve içten nezaketle, bazen en büyük kurtuluşun kalıcı aşk şeklinde geldiğini fark ederler.",
          ar: "عندما تضرب المأساة، تجد حياتها في حالة من الفوضى، يائسة من أجل الأمل والتوجيه. في أحلك ساعاتها، ينقذها غريب نكران الذات من الخطر، مختفياً قبل أن تتمكن من التعبير عن امتنانها. مصممة على العثور عليه، تتبع الأدلة التي تقودها إلى عالم غير متوقع مليء بالأعباء الخفية. لقاؤهما من جديد يشعل ليس فقط الذكريات الجميلة، ولكن أيضاً رغبة مشتركة في التغلب على الشياطين الشخصية. من خلال الدعم الثابت واللطف الصادق، يدركان أن أعظم إنقاذ يأتي أحياناً في شكل حب دائم"
        },
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-favorite-savior.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-favorite-savior.webp',
        releaseDate: new Date('2024-07-15'),
        isFeatured: true,
        totalEpisodes: 10,
        freeEpisodes: 4
      },
      {
        title: {
          en: 'My Husband is a Secret CEO',
          tr: 'Kocam Gizli Bir CEO',
          ar: 'زوجي رئيس تنفيذي سري'
        },
        description: {
          en: "She believed she married a humble office worker, content with the simple life they built. But when she stumbles upon documents revealing his true identity as a powerful CEO, her trust is shaken to its core. Pulled into a whirlwind of corporate politics and high-stakes negotiations, she must decide where her loyalties lie. As they navigate hidden agendas and dangerous rivals, their love is tested by constant deception. Ultimately, they discover that honesty and commitment can triumph even when secrets threaten to tear them apart.",
          tr: "Mütevazı bir ofis çalışanıyla evlendiğine ve kurdukları basit hayata razı olduğuna inanıyordu. Ancak onun güçlü bir CEO olduğunu ortaya çıkaran belgelere rastladığında, güveni derinden sarsılır. Şirket politikalarının ve yüksek riskli pazarlıkların girdabına sürüklenen kadın, sadakatinin nerede olduğuna karar vermek zorundadır. Gizli gündemler ve tehlikeli rakipler arasında yollarını bulmaya çalışırken, aşkları sürekli aldatmacalarla sınanır. Sonunda, sırlar onları ayırmakla tehdit etse bile, dürüstlük ve bağlılığın galip gelebileceğini keşfederler.",
          ar: "اعتقدت أنها تزوجت موظفاً متواضعاً، راضية بالحياة البسيطة التي بنوها. لكن عندما تعثر على وثائق تكشف هويته الحقيقية كرئيس تنفيذي قوي، يتزعزع ثقتها من جذورها. تنجذب إلى دوامة من السياسة المؤسسية والمفاوضات عالية المخاطر، وعليها أن تقرر أين يكمن ولاؤها. بينما يتنقلان بين الأجندات الخفية والمنافسين الخطرين، يتم اختبار حبهما من خلال الخداع المستمر. في النهاية، يكتشفان أن الصدق والالتزام يمكن أن ينتصرا حتى عندما تهدد الأسرار بتمزيقهما"
        },
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-husband-is-a-secret-ceo.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-husband-is-a-secret-ceo.webp',
        releaseDate: new Date('2024-06-30'),
        isFeatured: false,
        totalEpisodes: 9,
        freeEpisodes: 4
      },
      {
        title: {
          en: 'My Sweetheart Forever',
          tr: 'Sonsuza Dek Sevgilim',
          ar: 'حبيبي إلى الأبد'
        },
        description: {
          en: "From the moment they met in a bustling café, their hearts seemed inextricably linked. He was the steady, reliable type, while she exuded an infectious optimism that charmed everyone around her. Together, they faced personal tragedies, misunderstandings, and an ever-changing world that threatened to pull them apart. Their love story unfolds through quiet afternoons, shared laughter, and renewed promises of devotion. With each challenge overcome, their bond only grows stronger, promising a future of enduring warmth and unwavering commitment.",
          tr: "Kalabalık bir kafede karşılaştıkları andan itibaren, kalpleri çözülmez bir şekilde birbirine bağlı görünüyordu. O, istikrarlı, güvenilir bir tipti, kadın ise çevresindeki herkesi büyüleyen bulaşıcı bir iyimserlik yayıyordu. Birlikte kişisel trajedilerle, yanlış anlaşılmalarla ve onları ayırmakla tehdit eden sürekli değişen bir dünyayla yüzleştiler. Aşk hikayeleri, sessiz öğleden sonraları, paylaşılan kahkahalar ve yenilenen adanmışlık sözleriyle açılır. Her zorluğun üstesinden geldikçe, bağları yalnızca daha da güçlenir, kalıcı sıcaklık ve sarsılmaz bağlılık dolu bir gelecek vaat eder.",
          ar: "منذ لحظة لقائهما في مقهى مزدحم، بدت قلوبهما مرتبطة بشكل لا ينفصم. كان من النوع المستقر والموثوق به، بينما كانت تشع بتفاؤل معدٍ سحر كل من حولها. معاً، واجها المآسي الشخصية وسوء التفاهم وعالماً دائم التغير هدد بتفريقهما. تتكشف قصة حبهما من خلال فترات ما بعد الظهر الهادئة والضحك المشترك والوعود المتجددة بالتفاني. مع كل تحدٍ يتم التغلب عليه، تزداد رابطتهما قوة، واعدة بمستقبل من الدفء الدائم والالتزام الثابت"
        },
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-sweetheart-forever.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-sweetheart-forever.webp',
        releaseDate: new Date('2024-05-20'),
        isFeatured: true,
        totalEpisodes: 8,
        freeEpisodes: 3
      },
      {
        title: {
          en: "The Cold CEO's Cure",
          tr: 'Soğuk CEO\'nun İlacı',
          ar: 'علاج الرئيس التنفيذي البارد'
        },
        description: {
          en: "Renowned for his icy demeanor, a brilliant CEO values logic over emotion, running his company like a well-oiled machine. Enter a free-spirited employee who dares to defy his strict rules with her warmth and creativity. Their opposites-attract dynamic sparks both intrigue and irritation, compelling them to challenge each other daily. As he confronts buried emotions, she grapples with the pressures of corporate life, revealing a depth she never knew she had. In learning to lean on one another, they discover that vulnerability may just be the medicine for a frozen heart.",
          tr: "Buz gibi tavırlarıyla ünlü, parlak bir CEO mantığı duygulara tercih eder ve şirketini kusursuz işleyen bir makine gibi yönetir. Sıcaklığı ve yaratıcılığıyla onun katı kurallarına meydan okumaya cüret eden özgür ruhlu bir çalışan sahneye girer. Zıtların çekimi dinamikleri hem merak hem de sinir bozukluğu yaratır, birbirlerine günlük olarak meydan okumaya iter. O gömülü duygularıyla yüzleşirken, kadın kurumsal hayatın baskılarıyla boğuşur ve hiç bilmediği bir derinliğini ortaya çıkarır. Birbirlerine yaslanmayı öğrenirken, kırılganlığın donmuş bir kalp için ilaç olabileceğini keşfederler.",
          ar: "المشهور بسلوكه الجليدي، رئيس تنفيذي بارع يقدر المنطق على العاطفة، ويدير شركته مثل آلة محكمة. تدخل موظفة حرة الروح تجرؤ على تحدي قواعده الصارمة بدفئها وإبداعها. ديناميكية تجاذب الأضداد بينهما تثير كلاً من الفضول والانزعاج، مما يدفعهما إلى تحدي بعضهما البعض يومياً. بينما يواجه عواطفه المدفونة، تصارع هي ضغوط الحياة المؤسسية، كاشفة عن عمق لم تكن تعرف أنها تمتلكه. في تعلم الاعتماد على بعضهما البعض، يكتشفان أن الضعف قد يكون هو الدواء للقلب المتجمد"
        },
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-cold-ceo’s-cure.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-cold-ceo’s-cure.webp',
        releaseDate: new Date('2024-04-15'),
        isFeatured: false,
        totalEpisodes: 7,
        freeEpisodes: 3
      },
      {
        title: {
          en: "A Match Made in Hell",
          tr: "Bir Cehennemle Yapılmış Aşk",
          ar: "حب مصنوع في الجحيم"
        },
        description: {
          en: "In a world where trust is a rare commodity, two haunted souls are pushed together by a twisted chain of events. Their love affair begins under dire circumstances, filled with betrayal and secrets lurking at every corner. As they navigate a landscape of deceit, each tries to outsmart the other to protect their own heart. Unexpectedly, they discover that their biggest strength is the very bond they doubted from the start. Bound by passion and haunted by betrayal, they soon learn that not all devils wear horns, and real love can bloom even in the darkest shadows.",
          tr: "Güvenin nadir bir değer olduğu bir dünyada, iki perişan ruh bir dizi garip olayla bir araya gelir. Aşkları, her köşede ihanet ve sırlarla dolu zor koşullar altında başlar. Aldatmacalarla dolu bir dünyada birbirlerine üstün gelmeye çalışarak kalplerini korumaya çalışırlar. Beklenmedik bir şekilde, başlangıçta şüphe ettikleri en büyük güçlerinin tam da o bağ olduğunu keşfederler. Tutkuyla bağlı ve ihanetle lanetlenmiş bir şekilde, tüm şeytanların boynuzlu olmadığını ve gerçek aşkın karanlık gölgelerde bile yeşerebileceğini öğrenirler.",
          ar: "في عالم حيث الثقة سلعة نادرة، يتم دفع روحين معذبتين معًا بواسطة سلسلة ملتوية من الأحداث. تبدأ علاقتهما العاطفية في ظل ظروف صعبة، مليئة بالخيانة والأسرار التي تختبئ في كل زاوية. أثناء تنقلهما في عالم مليء بالخداع، يحاول كل منهما التفوق على الآخر لحماية قلبه. بشكل غير متوقع، يكتشفان أن أكبر قوتهما هي نفس الرابط الذي شككا فيه منذ البداية. مرتبطان بالعاطفة ومطاردان بالخيانة، سرعان ما يكتشفان أن ليس كل الشياطين يرتدون القرون، وأن الحب الحقيقي يمكن أن يزدهر حتى في أحلك الظلال."
        },
        tags: ["Romance", "Drama"],
        category: "love-and-betrayal",
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/a-match-made-in-hell.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/a-match-made-in-hell.webp",
        releaseDate: new Date('2024-03-10'),
        isFeatured: true,
        totalEpisodes: 17,
        freeEpisodes: 5
      },
      {
        title: {
          en: "In Bed with the Enemy",
          tr: "Düşmanla Yatakta",
          ar: "في السرير مع العدو"
        },
        description: {
          en: "When two fiercely competitive rivals are forced to share a single hotel suite on a business trip, neither is prepared for the tension that ensues. What starts as a heated battle of words soon turns into a simmering attraction that neither can deny. Each night, secrets and desires are exposed, complicating an already precarious alliance. As the line between rival and confidant blurs, both struggle to keep their own agendas intact. Ultimately, they face the question: can something so wrong be undeniably right?",
          tr: "İki rekabetçi rakip, iş seyahatinde bir otel odasını paylaşmaya zorlanınca, hiçbiri ortaya çıkan gerilime hazırlıklı değildir. Sözlü bir savaşla başlayan şey, kısa süre sonra reddedilemeyecek bir çekime dönüşür. Her gece sırlar ve arzular açığa çıkar, zaten tehlikeli olan bir ittifakı daha da karmaşıklaştırır. Rakip ve güvenilir kişi arasındaki sınır bulanıklaşırken, her ikisi de kendi gündemlerini korumaya çalışır. Sonunda, şu soruyla karşılaşırlar: Bu kadar yanlış olan bir şey gerçekten doğru olabilir mi?",
          ar: "عندما يُجبر منافسان شرسان على مشاركة جناح فندقي واحد في رحلة عمل، لا يكون أي منهما مستعدًا للتوتر الذي ينشأ. ما يبدأ كمعركة حامية بالكلمات سرعان ما يتحول إلى جذب متأجج لا يستطيع أي منهما إنكاره. في كل ليلة، تُكشف الأسرار والرغبات، مما يعقد تحالفًا غير مستقر بالفعل. مع تلاشي الخط الفاصل بين العدو والصديق المقرب، يكافح كلاهما للحفاظ على أجندته الخاصة. في النهاية، يواجهان السؤال: هل يمكن لشيء خاطئ للغاية أن يكون صحيحًا بلا منازع؟"
        },
        tags: ["Romance", "Drama"],
        category: "love-and-betrayal",
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/in-bed-with-the-enemy.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/in-bed-with-the-enemy.webp",
        releaseDate: new Date('2024-02-15'),
        isFeatured: false,
        totalEpisodes: 12,
        freeEpisodes: 4
      },
      {
        title: {
          en: "Love Captive to the Mafia Boss",
          tr: "Mafya Patronuna Tutsak Aşk",
          ar: "أسر الحب إلى رئيس المافيا"
        },
        description: {
          en: "Kidnapped in the dead of night, a young woman finds herself at the mercy of a powerful mafia boss. Though fear initially grips her every moment, she soon uncovers a surprising tenderness beneath his ruthless exterior. Their bond evolves from hostility to a complicated relationship fueled by conflicting emotions. Caught between loyalty to his dangerous world and the stirrings of his heart, the mafia boss battles old grudges threatening to tear them apart. Through captivity and confessions, they learn that sometimes, the strongest chains are forged by love itself.",
          tr: "Gece yarısı kaçırılan genç bir kadın, kendini güçlü bir mafya patronunun merhametine terk edilmiş bulur. İlk başta korku her anını sararken, kısa süre sonra onun acımasız dış yüzeyinin altında şaşırtıcı bir şefkat keşfeder. Bağlantıları, düşmanlıktan, karşıt duygularla beslenen karmaşık bir ilişkiye evrilir. Mafya patronu, tehlikeli dünyasına olan sadakati ile kalbindeki hisler arasında sıkışıp kalırken, eski husumetlerle mücadele eder ve bu durum onları birbirinden ayırma tehdidi oluşturur. Tutsaklık ve itiraflar yoluyla, bazen en güçlü zincirlerin, aşkın kendisi tarafından dövüldüğünü öğrenirler.",
          ar: "تم اختطاف امرأة شابة في منتصف الليل، وتجد نفسها في رحمة رئيس مافيا قوي. على الرغم من أن الخوف يسيطر عليها في البداية في كل لحظة، إلا أنها سرعان ما تكتشف شفقة مفاجئة تحت مظهره القاسي. تتطور علاقتهما من العداء إلى علاقة معقدة مدفوعة بالعواطف المتضاربة. عالق بين ولائه لعالمه الخطير واهتزازات قلبه، يقاتل رئيس المافيا ضد العداوات القديمة التي تهدد بتفريقهما. من خلال الأسر والاعترافات، يتعلمون أن أقوى السلاسل تُصنع أحيانًا بواسطة الحب نفسه."
        },
        tags: ["Romance", "Drama"],
        category: "love-and-betrayal",
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/love-captive-to-the-mafia-boss.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/love-captive-to-the-mafia-boss.webp",
        releaseDate: new Date('2024-01-20'),
        isFeatured: true,
        totalEpisodes: 29,
        freeEpisodes: 8
      },
      {
        title: {
          en: "Secret Baby for the CEO",
          tr: "CEO İçin Gizli Bebek",
          ar: "الطفل السري للرئيس التنفيذي"
        },
        description: {
          en: "When an ambitious intern and a charismatic CEO fall into a whirlwind romance, neither suspects what destiny has in store. After a brief separation, she uncovers a life-altering secret: she’s carrying his child. Fearing the consequences, she attempts to forge ahead alone while he juggles corporate takeovers and demanding board meetings. Their paths eventually collide again, fueling a battle of heartbreak, confusion, and lingering affection. In facing this unplanned challenge together, they learn that family can blossom in the most unexpected of circumstances.",
          tr: "Hırslı bir stajyer ve karizmatik bir CEO fırtınalı bir aşka kapıldığında, hiçbiri kaderin ne hazırladığını tahmin edemez. Kısa bir ayrılığın ardından, hayatını değiştirecek bir sır keşfeder: O, onun çocuğunu taşımaktadır. Sonuçlardan korkan kadın, yalnız başına ilerlemeye çalışırken, CEO kurumsal devralmalar ve zorlu toplantılarla mücadele etmektedir. Yolları tekrar kesişir ve bu, kalp kırıklığı, kafa karışıklığı ve devam eden bir sevgi mücadelesine yol açar. Bu beklenmedik zorlukla birlikte yüzleşerek, ailelerin en beklenmedik durumlarda bile yeşerebileceğini öğrenirler.",
          ar: "عندما يقع متدرب طموح ورئيس تنفيذي جذاب في رومانسية عاصفة، لا يشك أي منهما في ما يخبئه القدر. بعد انفصال قصير، تكشف عن سر يغير حياتها: هي حامل بطفله. خائفة من العواقب، تحاول المضي قدمًا بمفردها بينما يوازن هو بين الاستحواذات على الشركات واجتماعات مجلس الإدارة المرهقة. في النهاية تتقاطع طرقهما مرة أخرى، مما يثير معركة من الحزن والارتباك والعاطفة المستمرة. من خلال مواجهة هذا التحدي غير المخطط له معًا، يتعلمون أن الأسرة يمكن أن تنمو في أكثر الظروف غير المتوقعة."
        },
        tags: ["Romance", "Drama"],
        category: "love-and-betrayal",
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secret-baby-for-the-ceo.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secret-baby-for-the-ceo.webp",
        releaseDate: new Date('2023-12-25'),
        isFeatured: false,
        totalEpisodes: 8,
        freeEpisodes: 2
      },
      {
        title: {
          en: "The Alpha Mate Who Cried Wolf",
          tr: "Kurt Uluyan Alfa Eş",
          ar: "رفيق ألفا الذي بكى الذئب"
        },
        description: {
          en: "Bound by supernatural forces, she discovers she is the mate of an alpha wolf shifter with a tragic past. Though he leads with unwavering authority, a haunted memory continues to torment him. She tries to break through his walls, offering understanding and acceptance where he least expects it. As rival packs threaten their safety, they face the ultimate test of loyalty and courage. In the end, their bond, tested by fear and adversity, becomes an unbreakable beacon of hope for all who roam under the moonlit skies.",
          tr: "Doğaüstü güçlerle bağlı olarak, genç kadın, trajik bir geçmişi olan bir alfa kurt değişimcisinin eşi olduğunu keşfeder. Her ne kadar sarsılmaz bir otoriteyle liderlik etse de, onu rahatsız eden bir hatıra devamlı olarak onu zorlar. O, duvarlarını aşmaya çalışır, anlayış ve kabul sunarak, en beklemediği yerden. Rakip sürüler, zayıflıklarını sömürmek için gizlice beklerken, korudukları değerleri korumak için bir araya gelmeleri gerekir. Birlik ve tutkuyla, nihayetinde gerçek aşka giden yolun, genellikle çatışma ve adanmışlıkla şekillendiğinde en parlak şekilde yandığını öğrenirler.",
          ar: "مربوطين بالقوى الخارقة للطبيعة، تكتشف أنها رفيقة لألفا مستذئب ذو ماضٍ مأساوي. على الرغم من أنه يقود بسلطة ثابتة، إلا أن ذاكرة تطارده تواصل معذبته. تحاول اختراق جدرانه، مقدمة الفهم والقبول في المكان الذي لا يتوقعه. مع تهديدات الحزم المتنافسة لسلامتهم، يواجهون اختبار الولاء والشجاعة النهائي. في النهاية، يصبح رابطهم، الذي تم اختباره بالخوف والصعوبات، منارة لا تنكسر للأمل لجميع من يتجولون تحت السماء المضاءة بالقمر."
        },
        tags: ["Romance", "Drama"],
        category: "love-and-betrayal",
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-alpha-mate-who-cried-wolf.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/the-alpha-mate-who-cried-wolf.webp",
        releaseDate: new Date('2023-11-30'),
        isFeatured: true,
        totalEpisodes: 15,
        freeEpisodes: 4
      },
      {
        title: {
          en: "A Love Too Risky to Resist",
          tr: "Direnmesi Çok Riskli Bir Aşk",
          ar: "حب خطير جدًا للمقاومة"
        },
        description: {
          en: "Drawn into each other’s orbit by chance, a daring con artist and a principled detective find themselves trapped between duty and desire. Their mutual attraction flares despite a tangled web of lies and shifting allegiances. As stakes escalate, each secret uncovered pushes them closer together while tearing them further from their own moral codes. With danger lurking around every corner, they're forced to choose between self-preservation and a passion that could cost them everything. Ultimately, their journey proves that some loves are worth risking it all, even if it means breaking every rule.",
          tr: "Şansa birbirlerinin yörüngesine çekilen cesur bir dolandırıcı ve prensipli bir dedektif, kendilerini görev ve arzu arasında sıkışmış bulurlar. Karşılıklı çekimlerine rağmen, yalanlar ve değişen sadakatlerle dolu karmaşık bir ağ, onları yaklaştırır. Bahisler arttıkça, her ortaya çıkan sır onları birbirine yaklaştırırken, kendi ahlaki kodlarından daha da uzaklaştırır. Her köşede tehlike beklerken, kendilerini koruma ve her şeyi riske atabilecek bir tutku arasında bir seçim yapmaya zorlanırlar. Sonunda, yolculukları bazı aşklar için her şeyi riske atmanın değerli olduğunu kanıtlar, hatta bu her kuralı çiğnemek anlamına gelse bile.",
          ar: "جذبهم مصادفة إلى مدار بعضهم البعض، يجد فنان احتيال جريء ومحقق مبدئي نفسيهما عالقين بين الواجب والرغبة. تتأجج جاذبيتهما المتبادلة على الرغم من شبكة من الأكاذيب والتحالفات المتغيرة. مع تصعيد الرهانات، يدفع كل سر مكشوف لهما ليقتربا من بعضهما البعض بينما يمزقهما بعيدًا عن قوانينهما الأخلاقية. مع وجود الخطر في كل زاوية، يضطران لاختيار بين الحفاظ على الذات وعاطفة قد تكلفهما كل شيء. في النهاية، يثبت رحلتهما أن بعض أنواع الحب تستحق المخاطرة بكل شيء، حتى لو كان ذلك يعني خرق كل قاعدة."
        },
        tags: ["Romance", "Drama"],
        category: "secret-identity",
        thumbnail: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/a-love-too-risky-to-resist.webp",
        banner: "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/a-love-too-risky-to-resist.webp",
        releaseDate: new Date('2023-10-25'),
        isFeatured: false,
        totalEpisodes: 12,
        freeEpisodes: 4
      },
      {
        title: {
          en: "Billionaire Disguised as Gigolo",
          tr: "Zengin, Gigolo Olarak Gizlenen",
          ar: "الملياردير المتنكر كجوالا"
        },
        description: {
          en: "Determined to investigate life beyond corporate walls, a billionaire adopts a covert identity as a gigolo in a lavish nightclub. His plan to observe people's true nature takes an unexpected turn when he meets a fearless journalist on the brink of a major exposé. She senses there’s more to him than meets the eye, yet she can’t deny the pull of their undeniable chemistry. As hidden agendas unravel, both must face the repercussions of their deceptions. In a final showdown of truth, they learn that understanding and love can blossom in the most unexpected of places.",
          tr: "Şirket duvarlarının ötesinde bir hayatı araştırmaya kararlı bir milyarder, gösterişli bir gece kulübünde bir gigolo olarak gizli bir kimlik benimser. İnsanların gerçek doğasını gözlemleme planı, cesur bir gazeteciyle tanıştığında beklenmedik bir dönüş yapar. Bu gazeteci, onun gözlerinin ötesinde bir şeyler olduğunu hisseder, ancak aralarındaki inkar edilemez kimyayı reddedemez. Gizli ajandalar açığa çıkarken, her ikisi de aldatmacalarının sonuçlarıyla yüzleşmek zorunda kalır. Gerçeklerin son karşılaşmasında, anlayış ve aşkın en beklenmedik yerlerde filizlenebileceğini öğrenirler.",
          ar: "مصمم على التحقيق في الحياة خارج الجدران المؤسسية، يتبنى ملياردير هوية خفية كجوالا في نادٍ ليلي فاخر. تأخذ خطته لمراقبة الطبيعة الحقيقية للناس منعطفًا غير متوقع عندما يلتقي بصحفية جريئة على وشك الكشف عن فضيحة كبرى. تشعر أن هناك المزيد له مما تراه العين، ولكنها لا تستطيع إنكار الجذب الكيميائي الواضح بينهما. مع unraveling الأجندات الخفية، يجب على كليهما مواجهة تداعيات خداعاتهما. في مواجهة أخيرة للحقائق، يتعلمون أن الفهم والحب يمكن أن يزدهرا في أماكن غير متوقعة.",
        },
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/billionaire-disguised-as-gigolo.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/billionaire-disguised-as-gigolo.webp',
        releaseDate: new Date('2023-09-20'),
        isFeatured: true,
        totalEpisodes: 11,
        freeEpisodes: 3
      },
      {
        title: {
          en: "Mate Mine",
          tr: "Eşim Benim",
          ar: "رفيقي"
        },
        description: {
          en: "When fate intertwines the destinies of a strong-willed she-wolf and an enigmatic alpha, both struggle to accept the bond that binds them. Their fiery tempers and stubborn pride lead to countless clashes, each more intense than the last. Yet beneath the hostility, an undeniable yearning draws them closer, hinting at a shared destiny. As enemies lurk, eager to exploit their weaknesses, they must unite to protect what they hold dear. Through unity and passion, they ultimately learn that the path to true love often burns brightest when forged by conflict and devotion.",
          tr: "Kader, güçlü iradeli bir dişi kurt ile gizemli bir alfa'nın kaderlerini birbirine bağladığında, her ikisi de onları bağlayan bu bağı kabul etmekte zorlanır. Ateşli mizaçları ve inatçı gururları, birbirlerine karşı sayısız çatışmaya yol açar, her biri bir öncekinden daha yoğun olur. Ancak düşmanlıklarının altında, inkar edilemez bir özlem onları birbirine daha da yaklaştırır, paylaşılan bir kaderi ima eder. Düşmanlar, zayıflıklarını sömürmek için gizlice beklerken, korudukları değerleri korumak için bir araya gelmeleri gerekir. Birlik ve tutkuyla, nihayetinde gerçek aşka giden yolun, genellikle çatışma ve adanmışlıkla şekillendiğinde en parlak şekilde yandığını öğrenirler.",
          ar: "عندما تتشابك الأقدار بين ذئبة قوية الإرادة وألفا غامض، يصارع كلاهما لقبول الرابط الذي يربطهما. تؤدي مزاجهما الناري وكبرياؤهما العنيد إلى صراعات لا حصر لها، كل واحدة أكثر شدة من السابقة. ومع ذلك، تحت العداء، يجذبهم شوق لا يمكن إنكاره، مما يشير إلى مصير مشترك. بينما يتربص الأعداء، يتطلعون إلى استغلال ضعفه، يجب عليهما الاتحاد لحماية ما يعتزان به. من خلال الوحدة والشغف، يتعلمون في النهاية أن الطريق إلى الحب الحقيقي غالبًا ما يضيء بأشد عندما يتم تشكيله من خلال الصراع والإخلاص."
        },
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/mate-mine.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/mate-mine.webp',
        releaseDate: new Date('2023-08-15'),
        isFeatured: false,
        totalEpisodes: 11,
        freeEpisodes: 4
      },
      {
        title: {
          en: "The Most Hated She-Wolf",
          tr: "En Nefret Edilen Dişi Kurt",
          ar: "أكثر ذئبة مكروهة"
        },
        description: {
          en: "Feared and shunned by her own pack, she navigates life on the fringes of society. Beneath her cold exterior, however, lies a spirit yearning for acceptance and a place to call home. When a lone alpha vows to uncover her hidden past, he unravels more than just her personal history—he exposes his own vulnerabilities in the process. Through fraught encounters and desperate alliances, they learn to trust in each other’s strengths. In a world filled with prejudice and danger, their bond stands as a testament that even the most hated can find love and redemption.",
          tr: "Kendi paketinden korkulan ve dışlanan dişi kurt, hayatını toplumun kenarlarında sürdürmektedir. Ancak soğuk dış görünüşünün altında, kabul edilme ve bir yuva bulma arzusuyla dolu bir ruh vardır. Yalnız bir alfa, gizli geçmişini ortaya çıkarmak için yemin ettiğinde, sadece kişisel tarihini değil, kendi kırılganlıklarını da ortaya çıkarır. Zorlu karşılaşmalar ve umutsuz ittifaklar yoluyla, birbirlerinin güçlerine güvenmeyi öğrenirler. Önyargılar ve tehlikelerle dolu bir dünyada, bağları, en nefret edilenlerin bile aşk ve kurtuluş bulabileceğinin bir kanıtıdır.",
          ar: "مكروهة ومرفوضة من قطيعها الخاص، تعيش حياة على هامش المجتمع. ومع ذلك، تحت مظهرها البارد، تكمن روح تتوق إلى القبول ومكان لتدعوها منزلًا. عندما يلتزم ألفا وحيد بكشف ماضيها المخفي، يكشف أكثر من مجرد تاريخها الشخصي—بل يكشف عن نقاط ضعفه الخاصة في هذه العملية. من خلال اللقاءات المتوترة والتحالفات اليائسة، يتعلمون أن يثقوا في قوى بعضهم البعض. في عالم مليء بالتحامل والخطر، يصبح ارتباطهم شهادة على أن حتى الأكثر كراهية يمكنهم العثور على الحب والفداء."
        },
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-most-hated-she-wolf.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/the-most-hated-she-wolf.webp',
        releaseDate: new Date('2023-07-10'),
        isFeatured: true,
        totalEpisodes: 9,
        freeEpisodes: 2
      },
      {
        title: {
          en: "The Phoenix Conspiracy",
          tr: "Phoenix Komplosu",
          ar: "مؤامرة العنقاء"
        },
        description: {
          en: "A fearless detective stumbles upon a centuries-old secret, leading him directly into the path of a mysterious woman with ties to a covert organization. Both are entangled in a dangerous conspiracy that threatens to topple the balance between supernatural and human realms. As they work together, their trust is tested by half-truths, betrayals, and forces seeking to bury the truth. Yet every trial pushes them closer, igniting a romance that transcends their own fears and boundaries. In the end, only by uniting their strengths can they hope to unveil the conspiracy and rise above the ashes, like a phoenix reborn.",
          tr: "Korkusuz bir dedektif, yüzyıllar eski bir sırrı keşfeder ve onu gizli bir organizasyona bağlanan gizemli bir kadının yoluna yönlendirir. Her ikisi de, doğaüstü ve insani alemler arasındaki dengeyi devirmeyi tehdit eden tehlikeli bir komploya karışır. Birlikte çalışırken, güvenleri yarım doğrular, ihanetler ve gerçeği gömmek isteyen güçler tarafından test edilir. Ancak her deneme, onları birbirlerine yaklaştırır ve kendi korkularını ve sınırlarını aşan bir romantizmi ateşler. Sonunda, sadece güçlerini birleştirerek komployu ortaya çıkarabilirler ve küllerin üstünde yeniden doğan bir anka kuşu gibi yükselmeyi umabilirler.",
          ar: "يكتشف محقق شجاع سرًا قديمًا يعود لقرون، مما يقوده مباشرة إلى مسار امرأة غامضة لها صلات بمنظمة سرية. كلاهما متورطان في مؤامرة خطيرة تهدد بإسقاط التوازن بين العوالم الخيالية والبشرية. مع عملهما معًا، يتم اختبار ثقتهما من خلال نصف الحقائق والخيانة والقوى التي تسعى لإخفاء الحقيقة. ومع ذلك، تدفعهما كل تجربة إلى الاقتراب أكثر، مما يطلق علاقة حب تتجاوز مخاوفهما وحدودهما. في النهاية، فقط من خلال توحيد قوتهما يمكنهما الأمل في كشف المؤامرة والارتفاع فوق الرماد، مثل طائر الفينيق الذي يولد من جديد."
        },
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-phoenix-conspiracy.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-phoenix-conspiracy.webp',
        releaseDate: new Date('2023-06-05'),
        isFeatured: false,
        totalEpisodes: 6,
        freeEpisodes: 1
      }
    ];

    // Helper function to generate slug
    const generateSlug = (title) => {
      return title
        .toString()
        .toLowerCase()
        .replace(/'/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    // Episode generation function with unique paths
    const generateEpisodes = (movieId, movieData) => {
      const { totalEpisodes = 2, freeEpisodes = 1, title, category } = movieData;

      // Using the language parameter to get the correct title in the specified language
      const movieSlug = generateSlug(title.en);
      const episodes = [];

      for (let i = 1; i <= totalEpisodes; i++) {
        episodes.push({
          movieId,
          title: {
            en: `Episode ${i}`,
            tr: `Bölüm ${i}`,
            ar: `الحلقة ${i}`
          },
          order: i,
          number: i, 
          free: i <= freeEpisodes,
          videoUrl: `https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:movies/${category}/${movieSlug}/${i}.mp4`
        });
      }
      return episodes;
    };


    for (const movieData of sampleMovies) {
      // Don't destructure totalEpisodes and freeEpisodes anymore
      // const { totalEpisodes, freeEpisodes, ...movieDetails } = movieData;

      // Create or update the movie with ALL data including totalEpisodes
      const movie = await Movie.findOneAndUpdate(
        { 'title.en': movieData.title.en },
        { ...movieData }, // Pass the entire movieData object
        { upsert: true, new: true }
      );
      console.log(`Upserted movie: ${movie.title.en} with ${movie.totalEpisodes} episodes (${movie.freeEpisodes} free)`);

      // Generate and create episodes
      const episodes = generateEpisodes(movie._id, {
        title: movie.title,
        category: movie.category,
        totalEpisodes: movie.totalEpisodes,
        freeEpisodes: movie.freeEpisodes
      });

      // Delete existing episodes for this movie
      await Episode.deleteMany({ movieId: movie._id });

      // Create new episodes
      await Episode.insertMany(episodes);
      console.log(`Created ${episodes.length} episodes for movie: ${movie.title} free episodes)`);
    }

    return {
      success: true,
      message: `Seeding completed successfully! Mode: ${shouldClear ? 'Clear and Seed' : 'Upsert'}`,
    };
  } catch (error) {
    console.error('Error during seeding:', error);
    return { success: false, message: error.message };
  }
});
