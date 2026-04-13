-- Seed Data for Scrabble Pro Afrique

-- 1. Insert Countries
INSERT INTO public.countries (slug, name, code, flag, image, federation, clubs, players, description, tags)
VALUES 
('senegal', 'Sénégal', 'SN', '🇸🇳', '/images/country-senegal.jpg', 'Fédération Sénégalaise de Scrabble', 45, 1200, 'Le Sénégal est la nation dominante du Scrabble francophone africain.', ARRAY['Leader', 'Afrique de l''Ouest', 'Expert']),
('cote-ivoire', 'Côte d''Ivoire', 'CI', '🇨🇮', '/images/country-cotedivoire.jpg', 'Fédération Ivoirienne de Scrabble', 38, 950, 'La Côte d''Ivoire est un pilier du Scrabble africain avec une tradition d''excellence.', ARRAY['Pilier', 'Afrique de l''Ouest', 'Tradition']),
('cameroun', 'Cameroun', 'CM', '🇨🇲', '/images/country-cameroun.jpg', 'Fédération Camerounaise de Scrabble', 32, 780, 'Le Cameroun est une force montante du Scrabble francophone.', ARRAY['Force montante', 'Afrique Centrale']),
('gabon', 'Gabon', 'GA', '🇬🇦', '/images/tournament.jpg', 'Fédération Gabonaise de Scrabble', 15, 320, 'Le Gabon développe activement sa communauté de scrabbleurs.', ARRAY['Développement', 'Afrique Centrale']),
('togo', 'Togo', 'TG', '🇹🇬', '/images/community.jpg', 'Fédération Togolaise de Scrabble', 20, 450, 'Le Togo est reconnu pour ses tournois internationaux de qualité.', ARRAY['Organisation', 'Afrique de l''Ouest']),
('mali', 'Mali', 'ML', '🇲🇱', '/images/hero-scrabble.jpg', 'Fédération Malienne de Scrabble', 18, 380, 'Le Mali possède une communauté passionnée et en pleine croissance.', ARRAY['Passion', 'Sahel']);

-- 2. Insert Players
INSERT INTO public.players (slug, name, country_id, image, ranking, rating, titles, tags, bio, club, featured)
VALUES 
('ndongo-samba-sylla', 'Ndongo Samba Sylla', (SELECT id FROM public.countries WHERE name = 'Sénégal'), '/images/player1.jpg', 1, 2145, ARRAY['Champion d''Afrique 2024', 'Champion d''Afrique 2023', 'Open de Dakar 2024'], ARRAY['Champion', 'Expert', 'Sénégal'], 'Considéré comme le plus grand scrabbleur africain de sa génération, Ndongo domine le circuit depuis 5 ans.', 'Club de Scrabble de Dakar', true),
('fatou-ndiaye', 'Fatou Ndiaye', (SELECT id FROM public.countries WHERE name = 'Sénégal'), '/images/player2.jpg', 2, 2089, ARRAY['Championne d''Afrique Féminine 2024', 'Open de Lomé 2024'], ARRAY['Championne', 'Féminin', 'Sénégal'], 'Prodige du Scrabble sénégalais, Fatou a révolutionné le jeu féminin en Afrique.', 'AS Scrabble Dakar', true),
('kouadio-yao', 'Kouadio Yao', (SELECT id FROM public.countries WHERE name = 'Côte d''Ivoire'), '/images/player3.jpg', 3, 2034, ARRAY['Champion de Côte d''Ivoire 2024', 'Grand Prix d''Abidjan 2024'], ARRAY['Champion', 'Offensif', 'Côte d''Ivoire'], 'Leader du Scrabble ivoirien, Kouadio est réputé for son style offensif et ses coups spectaculaires.', 'Scrabble Club Abidjan', false),
('aicha-bamba', 'Aïcha Bamba', (SELECT id FROM public.countries WHERE name = 'Cameroun'), '/images/player4.jpg', 4, 1998, ARRAY['Championne du Cameroun 2024', 'Open de Douala 2024'], ARRAY['Arbitre', 'Championne', 'Cameroun'], 'Arbitre internationale et joueuse d''exception, Aïcha incarne l''excellence camerounaise.', 'Scrabble Club Douala', false);

-- 3. Insert Articles
INSERT INTO public.articles (slug, title, excerpt, content, image, category, tags, country_id, author, author_image, published_at, read_time, featured)
VALUES 
('championnat-afrique-2025-senegal-domine-dakar', 'Championnat d''Afrique 2025 : Le Sénégal domine à Dakar', 'Le Sénégal remporte le titre continental pour la troisième fois consécutive lors d''une compétition mémorable qui a rassemblé 24 nations.', 'Une édition historique du Championnat d''Afrique de Scrabble s''est tenue à Dakar...', '/images/tournament.jpg', 'Compétition', ARRAY['Championnat', 'Sénégal', 'Dakar', 'Afrique'], (SELECT id FROM public.countries WHERE name = 'Sénégal'), 'Amadou Diallo', '/images/player1.jpg', '2025-01-15', '5 min', true),
('fatou-ndiaye-portrait-championne-hors-norme', 'Fatou Ndiaye : portrait d''une championne hors norme', 'À seulement 23 ans, Fatou Ndiaye est devenue la plus jeune championne d''Afrique de l''histoire du Scrabble francophone.', 'Fatou Ndiaye incarne la nouvelle génération du Scrabble africain...', '/images/player2.jpg', 'Portrait', ARRAY['Portrait', 'Championne', 'Sénégal', 'Jeunesse'], (SELECT id FROM public.countries WHERE name = 'Sénégal'), 'Marie Kouassi', '/images/player4.jpg', '2025-01-10', '8 min', true),
('cote-ivoire-programme-national-scrabble-scolaire', 'La Côte d''Ivoire lance son programme national de Scrabble scolaire', 'Un ambitieux programme vise à introduire le Scrabble dans 500 écoles ivoiriennes d''ici 2026.', 'Le ministère de l''Éducation nationale de Côte d''Ivoire a annoncé...', '/images/country-cotedivoire.jpg', 'Éducation', ARRAY['Éducation', 'Scolaire', 'Côte d''Ivoire', 'Jeunesse'], (SELECT id FROM public.countries WHERE name = 'Côte d''Ivoire'), 'Ibrahim Touré', '/images/player3.jpg', '2025-01-08', '4 min', false),
('cameroun-jeux-francophonie-scrabble-2026', 'Le Cameroun accueillera les Jeux de la Francophonie du Scrabble 2026', 'Douala a été choisie comme ville hôte pour le plus grand événement francophone de Scrabble de l''année prochaine.', 'C''est officiel : le Cameroun accueillera les Jeux de la Francophonie...', '/images/country-cameroun.jpg', 'Événement', ARRAY['Événement', 'Cameroun', 'Douala', 'Francophonie'], (SELECT id FROM public.countries WHERE name = 'Cameroun'), 'Paul Mbarga', '/images/player1.jpg', '2025-01-05', '3 min', false);

-- 4. Insert Competitions
INSERT INTO public.competitions (slug, name, location, country_id, start_date, end_date, status, image, description, participants, type, tags)
VALUES 
('championnat-afrique-2025', 'Championnat d''Afrique 2025', 'Dakar, Sénégal', (SELECT id FROM public.countries WHERE name = 'Sénégal'), '2025-03-15', '2025-03-20', 'upcoming', '/images/tournament.jpg', 'Le plus grand événement de Scrabble francophone en Afrique. 24 nations attendues.', 240, 'Continental', ARRAY['Continental', 'Sénégal', 'Majeur']),
('open-international-lome-2025', 'Open International de Lomé', 'Lomé, Togo', (SELECT id FROM public.countries WHERE name = 'Togo'), '2025-02-10', '2025-02-13', 'upcoming', '/images/community.jpg', 'L''Open de Lomé accueille les meilleurs joueurs de la sous-région.', 120, 'International', ARRAY['International', 'Togo', 'Open']),
('grand-prix-abidjan-2025', 'Grand Prix d''Abidjan', 'Abidjan, Côte d''Ivoire', (SELECT id FROM public.countries WHERE name = 'Côte d''Ivoire'), '2025-01-20', '2025-01-22', 'ongoing', '/images/country-cotedivoire.jpg', 'Le rendez-vous incontournable du Scrabble ivoirien.', 80, 'National', ARRAY['National', 'Côte d''Ivoire', 'Grand Prix']);
