import { AdvancedDynamicTexture} from "@babylonjs/gui/2D";
import { StackPanel, TextBlock, Slider, Button, RadioButton, Control } from "@babylonjs/gui/2D/controls";

export const MenuGUI = {

    
    showGui: () => {
        // GUI
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("ui1");

        let panel = new StackPanel();  
        panel.width = .5;
        panel.rotation = 0;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.color = "black";
        advancedTexture.addControl(panel);


        /*
        let textblock = new TextBlock();
        textblock.height = "40px";
        textblock.width = "1600px";
        textblock.fontSize = 50;
        textblock.text = "Tamanho das esferas:";
        panel.addControl(textblock);   

        
        let slider = new Slider();
        slider.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        slider.minimum = 0;
        slider.maximum = 2 * Math.PI;
        slider.color = "green";
        slider.value = 0;
        slider.height = "20px";
        slider.width = "200px";
        panel.addControl(slider);   
        */



        //RADIO BUTTONS TO CHOOSE GAME FASE
        //radiobutton fase1
        let radioButtonFase1 = new RadioButton();
        radioButtonFase1.width = "40px";
        radioButtonFase1.height = "40px";
        radioButtonFase1.color = "black";
        radioButtonFase1.background = "green";     

        radioButtonFase1.onIsCheckedChangedObservable.add(function(state) {
            if (state) {
                alert("You selected ");
            }
        }); 

        
        let radioHeaderFase1 = Control.AddHeader(radioButtonFase1, "Fase1", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase1.height = "100px";
        radioHeaderFase1.children[1].fontSize = 70;
        radioHeaderFase1.children[1].onPointerDownObservable.add(function() {
            radioButtonFase1.isChecked = !radioButtonFase1.isChecked;
        });

        panel.addControl(radioHeaderFase1);
                

        //radiobutton fase2        
        let radioButtonFase2 = new RadioButton();
        radioButtonFase2.width = "40px";
        radioButtonFase2.height = "40px";
        radioButtonFase2.color = "black";
        radioButtonFase2.background = "yellow";     

        radioButtonFase2.onIsCheckedChangedObservable.add(function(state) {
            if (state) {
                alert("You selected 2");
            }
        }); 

        
        let radioHeaderFase2 = Control.AddHeader(radioButtonFase2, "Fase2", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase2.height = "100px";
        radioHeaderFase2.children[1].fontSize = 70;
        radioHeaderFase2.children[1].onPointerDownObservable.add(function() {
            radioButtonFase2.isChecked = !radioButtonFase1.isChecked;
        });

        panel.addControl(radioHeaderFase2);


        //radiobutton fase3        
        let radioButtonFase3 = new RadioButton();
        radioButtonFase3.width = "40px";
        radioButtonFase3.height = "40px";
        radioButtonFase3.color = "black";
        radioButtonFase3.background = "orange";     

        radioButtonFase3.onIsCheckedChangedObservable.add(function(state) {
            if (state) {
                alert("You selected 3");
            }
        }); 
        
        let radioHeaderFase3 = Control.AddHeader(radioButtonFase3, "Fase3", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase3.height = "100px";
        radioHeaderFase3.children[1].fontSize = 70;
        radioHeaderFase3.children[1].onPointerDownObservable.add(function() {
            radioButtonFase3.isChecked = !radioButtonFase1.isChecked;
        });

        panel.addControl(radioHeaderFase3);


        //radiobutton fase4
        let radioButtonFase4 = new RadioButton();
        radioButtonFase4.width = "40px";
        radioButtonFase4.height = "40px";
        radioButtonFase4.color = "black";
        radioButtonFase4.background = "red";     

        radioButtonFase4.onIsCheckedChangedObservable.add(function(state) {
            if (state) {
                alert("You selected 4");
            }
        }); 
        
        let radioHeaderFase4 =  Control.AddHeader(radioButtonFase4, "Fase4", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase4.height = "100px";
        radioHeaderFase4.children[1].fontSize = 70;
        radioHeaderFase4.children[1].onPointerDownObservable.add(function() {
            radioButtonFas43.isChecked = !radioButtonFase1.isChecked;
        });

        panel.addControl(radioHeaderFase4);

        

        
        

        
        var button1 = Button.CreateSimpleButton("btnStart", "Iniciar");
        button1.width = 1;
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 10;
        button1.background = "green";
        button1.onPointerUpObservable.add(function() {
            circle.scaleX += 0.1;
        });
        panel.addControl(button1);
    }


}
