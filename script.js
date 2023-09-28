const heroStats = [
  {
    name: 'Link',
    damage: 15,
    HP: 100,
    Lvl: 1,
    Gold: 20,
  },
  {
    name: 'Zelda',
    damage: 10,
    HP: 100,
    Lvl: 2,
    Gold: 100
  }
]

const bossStats = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}


function attackBoss() {
  let heroDamage = 0
  heroStats.forEach(hero => heroDamage += hero.damage)
  bossStats.health -= heroDamage
  if (bossStats.health <= 0) {
    window.alert('You Win, Ganon Leveled UP!')
    bossStats.level++
    bossStats.health = 100 * bossStats.level
  }
  document.getElementById('bossHealth').innerText = bossStats.health

}

function bossAttacks() {
  // heroStats.forEach(hero => hero.HP -= bossStats.damage)
  const Rng = Math.floor(Math.random() * heroStats.length)
  heroStats[Rng].HP -= bossStats.damage

  if (heroStats[Rng].HP <= 0) {
    heroStats[Rng].HP = 0
  }

  drawHero()
}

function drawHero() {
  const LinkHP = heroStats.find(hero => hero.name == 'Link')
  document.getElementById('linkHP').innerText = LinkHP.HP
  const ZeldaHP = heroStats.find(hero => hero.name == 'Zelda')
  document.getElementById('zeldaHP').innerText = ZeldaHP.HP


}

setInterval(bossAttacks, 1000)