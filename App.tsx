import React, { useState } from 'react';
import { Send, Lock, Shield, Zap, CheckCircle, Phone, Users, Search } from 'lucide-react';

export default function OKCGOPlatform() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const CORRECT_PASSWORD = 'OKCGO2025';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const knowledgeBase = {
    script_ouverture: {
      question: /script.*ouverture|comment.*commencer|débuter.*appel/i,
      reponse: "📞 SCRIPT D'OUVERTURE COMPLET\n\nBonjour Madame [Nom], je suis [Prénom] de chez OKCGO.\n\nVous aviez rempli notre formulaire en ligne concernant une opportunité d'investissement. Est-ce que vous avez quelques minutes pour en discuter ?\n\n[ATTENDRE OUI]\n\nMerci beaucoup. Vous aviez indiqué vouloir investir entre 10 000€ et 100 000€. Est-ce que vous pouvez m'en dire plus sur ce qui vous motive ?\n\n[ÉCOUTE ACTIVE]\n\nTrès bien, vous avez déjà investi ? Immobilier, bourse ou autres placements ?\n\n[NOTER]\n\nChez OKCGO, nous donnons accès à des opportunités premium à partir de 10 000€. Villas, hôtels, projets exclusifs.\n\nProchaine étape : ouvrir votre compte investisseur. Puis rendez-vous visio avec un expert.\n\nVous seriez disponible demain après-midi ou jeudi matin ?\n\n[PRENDRE RDV]\n\nSuper ! Vous recevrez un mail. Merci pour votre confiance !"
    },

    presentation: {
      question: /présent|c'est quoi|expliqu|comment.*fonctionne/i,
      reponse: "🏢 PRÉSENTATION OKCGO\n\nOKCGO permet de devenir copropriétaire d'actifs premium.\n\nCOMMENT ? Au lieu d'acheter seul une villa à 500 000€, vous investissez 10 000€ avec 49 autres. Vous touchez votre part des revenus et de la plus-value.\n\nACTIFS : Villas luxe, Hôtels, Immobilier premium, Entreprises\n\nAVANTAGES :\n• Ticket : 10 000€\n• Rendements : 10% brut/an max\n• Propriété réelle\n• Transparence totale\n\nÀ DIRE : Comme acheter un immeuble avec 49 amis. Chacun met 10 000€, tout le monde propriétaire."
    },

    ticket: {
      question: /ticket|minimum|10000|combien|montant/i,
      reponse: "💰 TICKET : 10 000€\n\nPOURQUOI ?\n• Projets premium\n• Mutualisation efficace\n• Groupe sérieux\n\nCOMPARAISON :\n• Immobilier classique : 100 000€+\n• Club deal privé : 50 000€+\n• OKCGO : 10 000€\n\nPossibilité : 15k, 20k, 50k€+\n\nSI OBJECTION : 10 000€ vs 100 000€ pour acheter seul. On rend le premium accessible."
    },

    rendement: {
      question: /rendement|combien.*gagn|rentabil|10%|profit/i,
      reponse: "📈 RENDEMENTS : 10% brut/an max\n\nCOMPOSITION :\n• Revenus : 4-6%/an\n• Valorisation : 4-6%\n• Total : 8-10% brut\n\nEXEMPLE 10 000€ :\n• Revenus annuels : 500-600€\n• Après 5 ans : 12-13k€\n\nCOMPARAISON 5 ans :\n• Livret A : 11 250€\n• Assurance-vie : 11 500€\n• OKCGO : 13 000€\n\n⚠️ Non garanti. Projections.\n\nÀ DIRE : On promet pas la lune. 10% max réaliste."
    },

    duree: {
      question: /durée|combien.*temps|horizon|récupér/i,
      reponse: "⏱️ DURÉE : 3 à 7 ans\n\n• Immobilier : 5-7 ans\n• Entreprises : 3-5 ans\n• Opérationnel : 2-4 ans\n\nPENDANT :\n• Revenus réguliers\n• Rapports trimestriels\n\nSORTIE : Revente actif → Capital + gains\n\nPas de liquidité immédiate. Argent bloqué.\n\nÀ DIRE : Moyen terme. Si besoin dans 6 mois, passez. Pour patrimoine 5-10 ans, parfait."
    },

    securite: {
      question: /sécurit|risque|garanti|protég|sûr/i,
      reponse: "🛡️ SÉCURITÉ\n\nSÉCURISÉ :\n• Lemon Way (BNP)\n• Double validation\n• Conformité réglementation\n• Sélection : 15-20% validés\n• Transparence totale\n\nNON GARANTI :\n• Capital non garanti\n• Rendements = projections\n• Risque de perte existe\n\nLIMITER RISQUE :\n• Mutualisation 50-100 investisseurs\n• Actifs tangibles\n• Expertise comité\n\nÀ DIRE : Tout investissement = risque. On le maîtrise au max."
    },

    objection_cher: {
      question: /trop cher|cher|prix.*élev|beaucoup/i,
      reponse: "💬 'Trop cher / 10 000€ c'est beaucoup'\n\n1. REFORMULER : Je comprends, c'est une somme.\n\n2. PERSPECTIVE :\nLivret A : 11 250€ en 5 ans\nOKCGO : 13 000€ en 5 ans\nDifférence : 1 750€\n\n3. ISOLER : À part le montant, le reste convient ?\n\n4. PROPOSER : On commence 10k€. Si ça plaît, vous augmentez.\n\nSI BLOQUÉ : Quel montant plus confortable ?"
    },

    objection_pas_argent: {
      question: /pas.*argent|pas.*budget|liquidit/i,
      reponse: "💬 'Pas d'argent / budget'\n\nQUALIFIER : Vraiment pas 10k€ dispo, ou pas envie placer ici ?\n\nA. PAS DISPO :\nÀ quel horizon ? 3 mois ? 6 mois ?\n→ Je note pour prochain projet\n\nB. PAS ENVIE :\nQu'est-ce qui retient ?\n→ Isoler vraie objection\n\nREPOSITION : Argent placé ailleurs ? Livret ? Quel rendement ? 2% ? Et si on triplait ?"
    },

    objection_risque: {
      question: /risqu|peur|perdre/i,
      reponse: "💬 'C'est risqué / Peur de perdre'\n\nVALIDER : Bonne question. Investisseur intelligent.\n\nMAÎTRISE :\n1. Mutualisation 50-100 personnes\n2. Sélection stricte (refuse 80-85%)\n3. Actifs tangibles réels\n4. Transparence rapports\n5. Expertise années\n\nRETOURNER : Vrai risque = inflation -3-4%/an. Sur 5 ans : -15-20% pouvoir achat.\n\nCLOSING : 2% garanti et perdre inflation, ou 10% risque maîtrisé ?"
    },

    objection_arnaque: {
      question: /arnaqu|fraude|scam|ponzi|dout/i,
      reponse: "💬 'C'est une arnaque / Doutes'\n\nCALME : Prudence normale.\n\nPREUVES :\n• EAGLE CLUB DEAL\n• SIREN : 939 700 993\n• 58 rue Monceau, Paris\n• Vérifiable societe.com\n\nDIFFÉRENCE PONZI :\nPonzi = paie anciens avec nouveaux\nOKCGO = actifs réels vérifiables\n\nVous pouvez voir villa, hôtel, documents.\n\nPROPOSER : Appel vidéo 30 min, je montre tout. Si doute, on arrête."
    },

    objection_pas_expert: {
      question: /pas.expert|connais.rien|novice/i,
      reponse: "💬 'Pas expert / Connais rien'\n\nREFRAME : C'est pour ça qu'OKCGO existe !\n\n60% jamais fait alternatif\n40% premier investissement\n100% accompagnés\n\nVOUS : Décider montant, choisir projets, suivre\n\nNOUS : Trouver opportunités, analyser tout, gérer, accompagner\n\nCLOSING : Personne naît expert. Vous êtes entouré d'experts."
    },

    objection_pas_temps: {
      question: /pas.*temps|occupé/i,
      reponse: "💬 'Pas le temps'\n\nTEMPS RÉEL :\n• Aujourd'hui : 15-20 min\n• Compte : 5 min\n• Signature : 5 min\n• Suivi : rapports trimestriels\n\nTotal : 30 min une fois.\n\nVS immobilier classique : 100h+\n\nCOÛT ATTENTE : 80-100€/mois perdus.\n\nPROPOSER : Email ce soir. Vous lisez 15 min weekend. Lundi call 10 min. 30 min total."
    },

    objection_plus_tard: {
      question: /plus.tard|mois.prochain|attendre/i,
      reponse: "💬 'Plus tard / Mois prochain'\n\nQUALIFIER : Qu'est-ce qui change dans 1 mois ?\n\nSI TEMPS : Dans 1 mois, deal fermé. Nouveau peut-être moins bien.\n\nSI BUDGET : OK. Liste prioritaire prochain.\n\nSI PAS PRIORITÉ : Franc : si pas priorité aujourd'hui, dans 1 mois oui ?\n\nCOÛT : Attendre 6 mois = 500€ perdus.\n\nPROPOSER : Réserve maintenant, 7 jours pour finaliser."
    },

    objection_reflexion: {
      question: /réfléchir|y.penser|consul/i,
      reponse: "💬 'Réfléchir / Voir conjoint'\n\nACCEPTER : Légitime pour 10k€.\n\nQUALIFIER : Qu'est-ce qui fait hésiter ?\n• Montant ?\n• Concept ?\n• Timing ?\n\nISOLER : Si on résout ce point, vous êtes prêt ?\n\nSI TIERS : En parler à qui ? Qu'est-ce qu'il/elle voudra savoir ?\n\nGUIDE :\n1. Pourquoi investir ?\n2. Peux bloquer 10k€ ?\n3. Bon moment ?\n4. Confiance OKCGO ?\n\nCLOSING : On se rappelle vendredi ? Notez questions."
    },

    script_qualification: {
      question: /qualifier|questions.*poser|découvrir/i,
      reponse: "❓ QUALIFICATION\n\n1. BUDGET : [Montant] toujours votre capacité ?\n\n2. EXPÉRIENCE : Déjà investi ? Immobilier, bourse, autres ?\n\n3. HORIZON : Court terme (2-3 ans) ou moyen (5-7 ans) ?\n\n4. MOTIVATION : Qu'est-ce qui vous intéresse ?\n\n5. DÉCISION : Seul décisionnaire ?\n\n6. TIMING : Si bon projet aujourd'hui, validation rapide ?\n\nSi hésitation Q6 → pas mûr"
    },

    script_closing: {
      question: /closer|conclure|signer|valider/i,
      reponse: "🎯 6 TECHNIQUES CLOSING\n\n1. ASSUMPTIVE : Je vous envoie le dossier. Vous êtes devant ordi ?\n\n2. ALTERNATIVE : Vous préférez 10k€ ou 15k€ ?\n\n3. URGENCY : Il reste 8 places. Je vous en réserve ?\n\n4. SUMMARY : Villa premium, 10% brut, copropriétaire. On y va ?\n\n5. TRIAL : Sur 10, où êtes-vous dans décision ?\n\n6. ASSUMPTIVE + URGENCY : Je réserve place avant remplissage. J'envoie tout.\n\nTOUJOURS demander engagement !"
    },

    script_relance: {
      question: /relance|suivi|rappel|follow/i,
      reponse: "📲 RELANCE\n\nJ+0 (2h) : Appel + SMS\nSMS : Bonjour [Prénom], [Nom] OKCGO. Vu intérêt investissement. Disponible ?\n\nJ+1 : Email témoignage + call fin aprem\n\nJ+3 : Message urgence\nNouvelle opportunité. 12 places. Intéressé ?\n\nJ+7 : Email rapport projet + appel\n\nJ+14 BREAK-UP :\nJe suppose pas prioritaire. Je ferme dossier ou vous voulez rester informé ?\n\n60% ventes après 5+ contacts !\n\nTOUJOURS apporter valeur"
    },

    contact: {
      question: /contact|email|téléphone|site/i,
      reponse: "📞 CONTACT OKCGO\n\n🌐 www.okcgo.com\n📱 App iOS & Android\n📧 contact@okcgo.com\n📍 58 rue Monceau, 75008 Paris\n\nSOCIÉTÉ : EAGLE CLUB DEAL\nSIREN : 939 700 993\n\nCONSEILS :\n• Donnez votre direct\n• Proposez calendrier RDV\n• Email récap après appel"
    }
  };

  const getAIResponse = (userQuestion) => {
    const lowerQuestion = userQuestion.toLowerCase();
    
    for (const item of Object.values(knowledgeBase)) {
      if (item.question && item.question.test(lowerQuestion)) {
        return item.reponse;
      }
    }
    
    return "🤖 OKCGO IA CLOSING\n\n📊 INFORMATIONS :\n• Présentation OKCGO\n• Ticket 10 000€\n• Rendements 10%\n• Durée 3-7 ans\n• Sécurité & risques\n\n💬 OBJECTIONS :\n• Trop cher\n• Pas d'argent\n• C'est risqué\n• C'est une arnaque\n• Pas expert\n• Pas le temps\n• Plus tard\n• Réfléchir\n\n📞 SCRIPTS :\n• Ouverture complète\n• Qualification\n• Closing (6 techniques)\n• Relance\n\nPosez votre question ! 💪";
  };

  const handleSubmit = () => {
    if (!question.trim()) return;

    const userMessage = { type: 'user', text: question };
    setConversation(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = getAIResponse(question);
      const aiMessage = { type: 'ai', text: aiResponse };
      setConversation(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
    
    setQuestion('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const quickQuestions = [
    "Script d'ouverture",
    "Présentation OKCGO",
    "Objection trop cher",
    "Objection risqué",
    "Techniques closing",
    "Stratégie relance"
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Lock className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">OKCGO IA Closing</h1>
            <p className="text-slate-600">Accès réservé équipe Advisory</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
              />
            </div>

            {showError && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                <Shield className="text-red-500" size={20} />
                <p className="text-red-700 text-sm font-medium">Mot de passe incorrect</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              Se connecter
            </button>

            <div className="text-center">
              <p className="text-xs text-slate-500">Mot de passe : OKCGO2025</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Zap className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">OKCGO IA Closing</h1>
                <p className="text-blue-200 text-sm mt-1">Plateforme équipe Advisory</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">10k€</div>
                <div className="text-blue-200 text-xs">Ticket min.</div>
              </div>
              <div className="h-12 w-px bg-blue-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">10%</div>
                <div className="text-blue-200 text-xs">Rendement max</div>
              </div>
              <div className="h-12 w-px bg-blue-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">3-7 ans</div>
                <div className="text-blue-200 text-xs">Horizon</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-blue-600" size={20} />
            <h2 className="font-bold text-slate-800">Actions rapides</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(q);
                  setTimeout(handleSubmit, 0);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="h-[600px] overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-white">
            {conversation.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-lg">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Phone className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    Prêt pour vos appels ? 🔥
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Posez n'importe quelle question sur OKCGO, les objections clients, ou les scripts de closing.
                  </p>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Exemples :</span> Script d'ouverture, Objection trop cher, Techniques de closing
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'bg-white text-slate-800 shadow-md border border-slate-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl px-5 py-4 shadow-md border border-slate-200">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-4 bg-white">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: Comment répondre à objection prix ?"
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!question.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
              >
                <Send size={20} />
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
