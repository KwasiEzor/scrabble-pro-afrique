import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import PlayerCard from '../components/PlayerCard';
import { players as staticPlayers } from '../lib/data';
import type { Player } from '../lib/data';
import { loadPlayers as fetchPlayers } from '../lib/siteContent';
import SEO from '../components/SEO';

export default function JoueursPage() {
  const [players, setPlayers] = useState<Player[]>(staticPlayers);

  useEffect(() => {
    async function loadPlayers() {
      setPlayers(await fetchPlayers());
    }
    loadPlayers();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-bg-primary min-h-screen">
      <SEO 
        title="Champions & Classement" 
        description="Découvrez les meilleurs scrabbleurs francophones d'Afrique. Classement ELO, palmarès et portraits de nos champions nationaux." 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Champions"
          title="Classement National"
          subtitle="Les meilleurs scrabbleurs francophones d'Afrique"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {players.map((player, i) => (
            <PlayerCard key={player.id} player={player} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
