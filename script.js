const heroStats = [
  {
    name: 'Link',
    damage: 15,
    HP: 100,
    Lvl: 1,
    Gold: 20,
    XP: 12,
    xpMultiplier: 4
  },
  {
    name: 'Zelda',
    damage: 10,
    HP: 100,
    Lvl: 2,
    Gold: 100,
    XP: 20,
    xpMultiplier: 3
  }
]

const bossStats = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  deaths: 0,
  reward: 10
}

const shopItems = {
  potion: 20,
  tingle: 1,
  epona: 500
}

function attackBoss() {
  let heroDamage = 0
  heroStats.forEach(hero => {
    if (hero.HP > 0) {
      heroDamage += hero.damage
    }
  })

  bossStats.health -= heroDamage
  if (bossStats.health <= 0) {
    window.alert('You Win! But Ganon Leveled UP!')
    bossStats.deaths++
    bossStats.level++
    bossStats.health = 100 * bossStats.level
    awardXP()
    bossStats.reward += 10
  }
  drawBoss()
}

function awardXP() {
  heroStats.forEach(hero => {
    hero.Gold += bossStats.reward
    hero.XP += 1 * hero.xpMultiplier
    hero.Lvl = Math.floor(hero.XP / 10)
  })
  drawHero()
}

function drawBoss() {
  document.getElementById('bossHealth').innerText = bossStats.health
  document.getElementById('bossLevel').innerText = bossStats.level
  document.getElementById('bossKills').innerText = bossStats.deaths
  document.getElementById('bossReward').innerText = bossStats.reward

}

function drawHero() {
  const heroLink = heroStats.find(hero => hero.name == 'Link')
  document.getElementById('linkHP').innerText = heroLink.HP
  document.getElementById('linkGOLD').innerText = heroLink.Gold
  document.getElementById('linkLVL').innerText = heroLink.Lvl
  const heroZelda = heroStats.find(hero => hero.name == 'Zelda')
  document.getElementById('zeldaHP').innerText = heroZelda.HP
  document.getElementById('zeldaGOLD').innerText = heroZelda.Gold
  document.getElementById('zeldaLVL').innerText = heroZelda.Lvl
}

function bossAttacks() {
  // heroStats.forEach(hero => hero.HP -= bossStats.damage)

  //RNG for who to attack
  const Rng = Math.floor(Math.random() * heroStats.length)
  // Boss damages Hero
  heroStats[Rng].HP -= bossStats.damage
  // prevent negative health
  if (heroStats[Rng].HP <= 0) {
    heroStats[Rng].HP = 0
  }

  drawHero()
}


function healButton() {
  const heroLink = heroStats.find(hero => hero.name == 'Link')
  const heroZelda = heroStats.find(hero => hero.name == 'Zelda')

  // replaced isConfirmed with Link & isDenied with Zelda
  Swal.fire({
    title: 'Who would you like to heal?',
    showConfirmButton: (heroLink.Gold >= 20 && heroLink.HP > 0),
    showDenyButton: (heroZelda.Gold >= 20 && heroZelda.HP > 0),
    showCancelButton: true,
    confirmButtonText: 'Link',
    denyButtonText: `Zelda`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Link Healed!', '-20 Gold from Link', 'success')
      heroLink.HP += 50
      heroLink.Gold -= 20
      if (heroLink.HP >= 100) {
        heroLink.HP = 100
      }
    } else if (result.isDenied) {
      Swal.fire('Zelda Healed', '-20 Gold from Zelda', 'success')
      heroZelda.HP += 50
      heroZelda.Gold -= 20
      if (heroZelda.HP >= 100) {
        heroZelda.HP = 100
      }
    }
  })
}

drawHero()

setInterval(bossAttacks, 1000)