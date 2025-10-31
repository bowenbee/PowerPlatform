# Message Banner

## Description

This Canvas App Component, built using Power Fx code, allows the user to display a message banner based on an error,warning, info, and success as desired.

![Image1](assets/messagebanners.png)

### **Inputs**

**SelectedID**  
Can be set to one of the following values based on the **ID** in the *Items* table:

- **1** = Warning  
- **2** = Error  
- **3** = Info  
- **4** = Success  

**Show Icon**  
Controls whether the SVG icon is displayed.  
(Default is true.)

**Message Text**  
Defaults to the message text from the *Items* table, unless customized by the user.
