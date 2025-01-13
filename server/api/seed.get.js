import connectToDatabase from '~/server/utils/db';
import Movie from '~/server/models/Movie';
import Category from '~/server/models/Category';
import Episode from '~/server/models/Episode';
import mongoose from 'mongoose';
import Package from '~/server/models/Package';

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
        Package.deleteMany({})
      ]);
      console.log('Cleared existing data');
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
      { name: 'New Release', slug: 'new-release', icon: '🎬' },
      { name: 'Secret Identity', slug: 'secret-identity', icon: '🕵️‍♂️' },
      { name: 'Love & Betrayal', slug: 'love-and-betrayal', icon: '💘' },
      { name: 'Billionaire Romance', slug: 'billionaire-romance', icon: '🌏' },
      { name: 'Asian', slug: 'asian', icon: '♻️' },
    ];

    for (const category of categories) {
      await Category.findOneAndUpdate(
        { slug: category.slug },
        category,
        { upsert: true, new: true }
      );
      console.log(`Upserted category: ${category.name}`);
    }

    // Seed Movies
    const sampleMovies = [
      {
        title: "Billionaire's Love in Danger",
        description:
          "When a powerful billionaire crosses paths with an ordinary woman, sparks fly and secrets unravel at every turn. Their worlds collide under the most perilous circumstances, forcing them to confront past traumas and future uncertainties. With enemies lurking in the shadows, they soon realize that love may be the only thing more powerful than money. As they fight against looming danger, their bond intensifies, revealing hidden strengths and vulnerabilities. Ultimately, their story becomes a testament to courage and a love worth risking everything for.",
        tags: ['Romance', 'Drama'],
        category: 'billionaire-romance',
        thumbnail:
          "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/billionaire's-love-in-danger.webp",
        banner:
          "https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/billionaire's-love-in-danger.webp",
        releaseDate: new Date('2024-12-01'),
        isFeatured: true,
        totalEpisodes: 13,
        freeEpisodes: 5
      },
      {
        title: "It's Obvious that You Love Me",
        description:
          "When an unlikely pair meets, the chemistry between them is impossible to ignore. Despite their constant bickering and teasing, their growing affection is as plain as day to everyone around them. Each stolen glance reveals deeper emotions hiding behind witty banter. A series of mishaps forces them to work together, challenging their pride and testing their patience. In discovering the truth about one another, they learn that sometimes love is right in front of you, even if you pretend not to see it.",
        tags: ['Romance', 'Comedy'],
        category: 'billionaire-romance',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/it’s-obvious-that-you-love-me.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/it’s-obvious-that-you-love-me.webp',
        releaseDate: new Date('2024-12-15'),
        isFeatured: false,
        totalEpisodes: 7,
        freeEpisodes: 3
      },
      {
        title: 'My Blind Husband is a Billionaire',
        description:
          "After a life-changing accident, a reclusive billionaire loses his sight and isolates himself from the outside world. When fate brings a determined caregiver into his life, she challenges his notions of independence and trust. Their relationship blossoms amidst daily struggles, from navigating physical obstacles to confronting emotional scars. He learns that love can be the greatest guide, even when darkness surrounds you. In rediscovering hope and purpose, they find that true wealth lies in the bonds of the heart.",
        tags: ['Romance', 'Drama'],
        category: 'billionaire-romance',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-blind-husband-is-a-billionaire.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-blind-husband-is-a-billionaire.webp',
        releaseDate: new Date('2024-11-20'),
        isFeatured: true,
        totalEpisodes: 19,
        freeEpisodes: 5
      },
      {
        title: 'Secrets of the Amnesia Billionaire',
        description:
          "When a billionaire businessman wakes up without any memory of his past, he embarks on a quest to rediscover his identity. Along the way, he encounters a fierce yet compassionate woman who holds the key to his forgotten life. Intrigue unfolds as cryptic messages and hidden agendas surface, threatening to derail his search for truth. Amid the mounting tension, an unexpected romance takes root, defying the dangers that circle them. Together, they uncover secrets that not only change his future but also redefine what he believes about love, trust, and second chances.",
        tags: ['Romance', 'Mystery'],
        category: 'billionaire-romance',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secrets-of-the-amnesia-billionaire.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secrets-of-the-amnesia-billionaire.webp',
        releaseDate: new Date('2024-10-10'),
        isFeatured: false,
        totalEpisodes: 11,
        freeEpisodes: 3
      },
      {
        title: 'The Shy Beauty and the Billionaire Beast',
        description:
          "Quiet and timid, she lives a humble life far removed from high society’s glare. Fate, however, thrusts her into the path of a ruthless billionaire with a reputation as cold as ice. As she navigates his palatial estate and the secrets that lurk in its corridors, she discovers a wounded man beneath the beastly exterior. Their relationship grows through hesitant steps of trust, kind gestures, and late-night confessions. Ultimately, their tender bond reveals that love can bloom in even the unlikeliest places, transcending fear and prejudice.",
        tags: ['Romance', 'Fantasy'],
        category: 'billionaire-romance',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-shy-beauty-and-the-billionaire-beast.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/the-shy-beauty-and-the-billionaire-beast.webp',
        releaseDate: new Date('2024-09-05'),
        isFeatured: true,
        totalEpisodes: 16,
        freeEpisodes: 5
      },
      {
        title: 'Delivering Love',
        description:
          "Every dawn, a dedicated courier sets out to deliver packages and warm smiles across the bustling city...",
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/delivering-love.webp',
        banner: 'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/delivering-love.webp',
        releaseDate: new Date('2024-08-25'),
        isFeatured: false,
        totalEpisodes: 9,
        freeEpisodes: 3
      },      
      {
        title: 'My Favorite Savior',
        description:
          "When tragedy strikes, she finds her life in disarray, desperate for hope and direction. In her darkest hour, a selfless stranger saves her from danger, vanishing before she can express her gratitude. Determined to find him, she follows clues that lead to an unexpected world filled with hidden burdens. Their reunion sparks not just fond remembrance, but a shared desire to conquer personal demons. Through unwavering support and heartfelt kindness, they realize that sometimes the greatest rescue comes in the form of enduring love.",
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-favorite-savior.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-favorite-savior.webp',
        releaseDate: new Date('2024-07-15'),
        isFeatured: true,
        totalEpisodes: 10,
        freeEpisodes: 4
      },
      {
        title: 'My Husband is a Secret CEO',
        description:
          "She believed she married a humble office worker, content with the simple life they built. But when she stumbles upon documents revealing his true identity as a powerful CEO, her trust is shaken to its core. Pulled into a whirlwind of corporate politics and high-stakes negotiations, she must decide where her loyalties lie. As they navigate hidden agendas and dangerous rivals, their love is tested by constant deception. Ultimately, they discover that honesty and commitment can triumph even when secrets threaten to tear them apart.",
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-husband-is-a-secret-ceo.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-husband-is-a-secret-ceo.webp',
        releaseDate: new Date('2024-06-30'),
        isFeatured: false,
        totalEpisodes: 9,
        freeEpisodes: 4
      },
      {
        title: 'My Sweetheart Forever',
        description:
          "From the moment they met in a bustling café, their hearts seemed inextricably linked. He was the steady, reliable type, while she exuded an infectious optimism that charmed everyone around her. Together, they faced personal tragedies, misunderstandings, and an ever-changing world that threatened to pull them apart. Their love story unfolds through quiet afternoons, shared laughter, and renewed promises of devotion. With each challenge overcome, their bond only grows stronger, promising a future of enduring warmth and unwavering commitment.",
        tags: ['Romance', 'Drama'],
        category: 'asian',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/my-sweetheart-forever.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/my-sweetheart-forever.webp',
        releaseDate: new Date('2024-05-20'),
        isFeatured: true,
        totalEpisodes: 8,
        freeEpisodes: 3
      },
      {
        title: "The Cold CEO's Cure",
        description:
          "Renowned for his icy demeanor, a brilliant CEO values logic over emotion, running his company like a well-oiled machine. Enter a free-spirited employee who dares to defy his strict rules with her warmth and creativity. Their opposites-attract dynamic sparks both intrigue and irritation, compelling them to challenge each other daily. As he confronts buried emotions, she grapples with the pressures of corporate life, revealing a depth she never knew she had. In learning to lean on one another, they discover that vulnerability may just be the medicine for a frozen heart.",
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
        title: 'A Match Made in Hell',
        description:
          "In a world where trust is a rare commodity, two haunted souls are pushed together by a twisted chain of events. Their love affair begins under dire circumstances, filled with betrayal and secrets lurking at every corner. As they navigate a landscape of deceit, each tries to outsmart the other to protect their own heart. Unexpectedly, they discover that their biggest strength is the very bond they doubted from the start. Bound by passion and haunted by betrayal, they soon learn that not all devils wear horns, and real love can bloom even in the darkest shadows.",
        tags: ['Romance', 'Drama'],
        category: 'love-and-betrayal',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/a-match-made-in-hell.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/a-match-made-in-hell.webp',
        releaseDate: new Date('2024-03-10'),
        isFeatured: true,
        totalEpisodes: 17,
        freeEpisodes: 5
      },
      {
        title: 'In Bed with the Enemy',
        description:
          "When two fiercely competitive rivals are forced to share a single hotel suite on a business trip, neither is prepared for the tension that ensues. What starts as a heated battle of words soon turns into a simmering attraction that neither can deny. Each night, secrets and desires are exposed, complicating an already precarious alliance. As the line between rival and confidant blurs, both struggle to keep their own agendas intact. Ultimately, they face the question: can something so wrong be undeniably right?",
        tags: ['Romance', 'Drama'],
        category: 'love-and-betrayal',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/in-bed-with-the-enemy.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/in-bed-with-the-enemy.webp',
        releaseDate: new Date('2024-02-15'),
        isFeatured: false,
        totalEpisodes: 12,
        freeEpisodes: 4
      },
      {
        title: 'Love Captive to the Mafia Boss',
        description:
          "Kidnapped in the dead of night, a young woman finds herself at the mercy of a powerful mafia boss. Though fear initially grips her every moment, she soon uncovers a surprising tenderness beneath his ruthless exterior. Their bond evolves from hostility to a complicated relationship fueled by conflicting emotions. Caught between loyalty to his dangerous world and the stirrings of his heart, the mafia boss battles old grudges threatening to tear them apart. Through captivity and confessions, they learn that sometimes, the strongest chains are forged by love itself.",
        tags: ['Romance', 'Drama'],
        category: 'love-and-betrayal',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/love-captive-to-the-mafia-boss.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/love-captive-to-the-mafia-boss.webp',
        releaseDate: new Date('2024-01-20'),
        isFeatured: true,
        totalEpisodes: 29,
        freeEpisodes: 8
      },
      {
        title: 'Secret Baby for the CEO',
        description:
          "When an ambitious intern and a charismatic CEO fall into a whirlwind romance, neither suspects what destiny has in store. After a brief separation, she uncovers a life-altering secret: she’s carrying his child. Fearing the consequences, she attempts to forge ahead alone while he juggles corporate takeovers and demanding board meetings. Their paths eventually collide again, fueling a battle of heartbreak, confusion, and lingering affection. In facing this unplanned challenge together, they learn that family can blossom in the most unexpected of circumstances.",
        tags: ['Romance', 'Drama'],
        category: 'love-and-betrayal',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secret-baby-for-the-ceo.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/secret-baby-for-the-ceo.webp',
        releaseDate: new Date('2023-12-25'),
        isFeatured: false,
        totalEpisodes: 8,
        freeEpisodes: 2
      },
      {
        title: 'The Alpha Mate Who Cried Wolf',
        description:
          "Bound by supernatural forces, she discovers she is the mate of an alpha wolf shifter with a tragic past. Though he leads with unwavering authority, a haunted memory continues to torment him. She tries to break through his walls, offering understanding and acceptance where he least expects it. As rival packs threaten their safety, they face the ultimate test of loyalty and courage. In the end, their bond, tested by fear and adversity, becomes an unbreakable beacon of hope for all who roam under the moonlit skies.",
        tags: ['Romance', 'Drama'],
        category: 'love-and-betrayal',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-alpha-mate-who-cried-wolf.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/the-alpha-mate-who-cried-wolf.webp',
        releaseDate: new Date('2023-11-30'),
        isFeatured: true,
        totalEpisodes: 15,
        freeEpisodes: 4
      },
      {
        title: 'A Love Too Risky to Resist',
        description:
          "Drawn into each other’s orbit by chance, a daring con artist and a principled detective find themselves trapped between duty and desire. Their mutual attraction flares despite a tangled web of lies and shifting allegiances. As stakes escalate, each secret uncovered pushes them closer together while tearing them further from their own moral codes. With danger lurking around every corner, they're forced to choose between self-preservation and a passion that could cost them everything. Ultimately, their journey proves that some loves are worth risking it all, even if it means breaking every rule.",
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/a-love-too-risky-to-resist.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/a-love-too-risky-to-resist.webp',
        releaseDate: new Date('2023-10-25'),
        isFeatured: false,
        totalEpisodes: 12,
        freeEpisodes: 4
      },
      {
        title: 'Billionaire Disguised as Gigolo',
        description:
          "Determined to investigate life beyond corporate walls, a billionaire adopts a covert identity as a gigolo in a lavish nightclub. His plan to observe people's true nature takes an unexpected turn when he meets a fearless journalist on the brink of a major exposé. She senses there’s more to him than meets the eye, yet she can’t deny the pull of their undeniable chemistry. As hidden agendas unravel, both must face the repercussions of their deceptions. In a final showdown of truth, they learn that understanding and love can blossom in the most unexpected of places.",
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/billionaire-disguised-as-gigolo.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/billionaire-disguised-as-gigolo.webp',
        releaseDate: new Date('2023-09-20'),
        isFeatured: true,
        totalEpisodes: 11,
        freeEpisodes: 3
      },
      {
        title: 'Mate Mine',
        description:
          "When fate intertwines the destinies of a strong-willed she-wolf and an enigmatic alpha, both struggle to accept the bond that binds them. Their fiery tempers and stubborn pride lead to countless clashes, each more intense than the last. Yet beneath the hostility, an undeniable yearning draws them closer, hinting at a shared destiny. As enemies lurk, eager to exploit their weaknesses, they must unite to protect what they hold dear. Through unity and passion, they ultimately learn that the path to true love often burns brightest when forged by conflict and devotion.",
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/mate-mine.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/mate-mine.webp',
        releaseDate: new Date('2023-08-15'),
        isFeatured: false,
        totalEpisodes: 11,
        freeEpisodes: 4
      },
      {
        title: 'The Most Hated She-Wolf',
        description:
          "Feared and shunned by her own pack, she navigates life on the fringes of society. Beneath her cold exterior, however, lies a spirit yearning for acceptance and a place to call home. When a lone alpha vows to uncover her hidden past, he unravels more than just her personal history—he exposes his own vulnerabilities in the process. Through fraught encounters and desperate alliances, they learn to trust in each other’s strengths. In a world filled with prejudice and danger, their bond stands as a testament that even the most hated can find love and redemption.",
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-most-hated-she-wolf.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/banner/the-most-hated-she-wolf.webp',
        releaseDate: new Date('2023-07-10'),
        isFeatured: true,
        totalEpisodes: 9,
        freeEpisodes: 2
      },
      {
        title: 'The Phoenix Conspiracy',
        description:
          "A fearless detective stumbles upon a centuries-old secret, leading him directly into the path of a mysterious woman with ties to a covert organization. Both are entangled in a dangerous conspiracy that threatens to topple the balance between supernatural and human realms. As they work together, their trust is tested by half-truths, betrayals, and forces seeking to bury the truth. Yet every trial pushes them closer, igniting a romance that transcends their own fears and boundaries. In the end, only by uniting their strengths can they hope to unveil the conspiracy and rise above the ashes, like a phoenix reborn.",
        tags: ['Romance', 'Drama'],
        category: 'secret-identity',
        thumbnail:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-phoenix-conspiracy.webp',
        banner:
          'https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:images/the-phoenix-conspiracy.webp',
        releaseDate: new Date('2023-06-05'),
        isFeatured: false,
        totalEpisodes: 6,
        freeEpisodes: 1
      },
    ];

    // Helper function to convert title to slug
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/'/g, '') // Remove apostrophes without adding dashes
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    // Episode generation function with unique paths
    const generateEpisodes = (movieId, movieData) => {
      const { totalEpisodes = 2, freeEpisodes = 1, title, category } = movieData;
      const movieSlug = generateSlug(title);
      const episodes = [];
      
      for (let i = 1; i <= totalEpisodes; i++) {
        episodes.push({
          movieId,
          title: `Episode ${i}`,
          order: i,
          free: i <= freeEpisodes,
          videoUrl: `https://usc1.contabostorage.com/3225fed53fdc4eaca005a8a98b789240:movies/${category}/${movieSlug}/${i}.mp4`
        });
      }
      return episodes;
    };


    for (const movieData of sampleMovies) {
      const { totalEpisodes, freeEpisodes, ...movieDetails } = movieData;

      // Create or update the movie
      const movie = await Movie.findOneAndUpdate(
        { title: movieDetails.title },
        movieDetails,
        { upsert: true, new: true }
      );
      console.log(`Upserted movie: ${movie.title}`);

      // Generate and create episodes for the movie
      const episodes = generateEpisodes(movie._id, {
        title: movie.title,
        category: movie.category,
        totalEpisodes,
        freeEpisodes
      });

      // Delete existing episodes for this movie
      await Episode.deleteMany({ movieId: movie._id });
      
      // Create new episodes
      await Episode.insertMany(episodes);
      console.log(`Created ${episodes.length} episodes for movie: ${movie.title} (${freeEpisodes} free episodes)`);
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
