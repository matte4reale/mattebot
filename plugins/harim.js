let handler = async (m, { conn }) => {
  const animazioni = [
`       333 bot-         
         -Origin-Bot    
    Vare-Bot-            
         -Onix-Bot       
 Turbo-Bot-         
         -Bixby-Bot`,

`       333 bot-         
         -Origin-Bot    
    Vare-Bot-            
         -Onix-Bot       
     Turbo-Bot-         
         -Bixby-Bot`,

`       333 bot-         
    Origin-Bot-        
    Vare-Bot           
      -Onix-Bot-       
     Turbo-Bot         
        -Bixby-Bot`,

`     333 bot-      
 Origin-Bot-     
   Vare-Bot         
 -Onix-Bot-      
  Turbo-Bot         
   Bixby-Bot`,

`   333 bot-    
 Origin-Bot    
Vare-Bot    
  Onix-Bot    
Turbo-Bot    
  Bixby-Bot`,

`   
   
    🌐 CHATUNITY BOT 🌐
   

`
  ];

  let msg = await conn.sendMessage(m.chat, { text: animazioni[0] }, { quoted: m });

  for (let i = 1; i < animazioni.length; i++) {
    await new Promise(res => setTimeout(res, 1000));
    try {
      await conn.sendMessage(m.chat, {
        text: animazioni[i],
        edit: msg.key
      });
    } catch (e) {
      await conn.sendMessage(m.chat, { delete: msg.key });
      msg = await conn.sendMessage(m.chat, { text: animazioni[i] });
    }
  }
};

handler.command = ['harim'];
export default handler;