import { AdvancedDynamicTexture} from "@babylonjs/gui/2D";
import { StackPanel, TextBlock, Slider, Button, RadioButton, InputText, Control } from "@babylonjs/gui/2D/controls";

export class MenuGUI{

    constructor(gameInstance){
        console.log("constructor(gameInstance){...");
        this._gameInstance = gameInstance;
    }
    
    showGui(){
        console.log("showGui(){...");
        console.log(this._gameInstance);
        
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("ui1");

        let panel = new StackPanel();  
        panel.width = 0.5;
        //panel.background = "red";
        panel.rotation = 0;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.color = "black";
        advancedTexture.addControl(panel);

        
        /*
        let panel2 = new StackPanel();  
        panel2.width = 0.5;
        panel2.background = "gray";
        panel2.rotation = 0;
        panel2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel2.color = "black";
        advancedTexture.addControl(panel2);
        */

        
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


        
        //COLLECT USERNAME
        //so buggy or I did no undertand
        /*
        let iTxtUserName = new InputText();
        iTxtUserName.text = "Nome do aluno";
        iTxtUserName.autoStretchWidth = true;
        iTxtUserName.maxWidth = "20px";
        iTxtUserName.width = 0.2;
        iTxtUserName.heigth = "40px";
        iTxtUserName.color = "black";
        iTxtUserName.background = "yellow";
        panel.horizontalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        */
        
        //RADIO BUTTONS TO CHOOSE GAME FASE
        //radiobutton fase1
        let radioButtonFase1 = new RadioButton();
        radioButtonFase1.width = "40px";
        radioButtonFase1.height ="40px";
        radioButtonFase1.color = "black";
        radioButtonFase1.background = "green";     

        radioButtonFase1.onIsCheckedChangedObservable.add((state) => {
            if (state) {
                this._gameInstance.createSpheres(1,5);
            }
        }); 

        
        let radioHeaderFase1 = Control.AddHeader(radioButtonFase1, "Fase1", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase1.height = "40px";
        radioHeaderFase1.children[1].fontSize = 40;
        radioHeaderFase1.children[1].onPointerDownObservable.add(function() {
            radioButtonFase1.isChecked = !radioButtonFase1.isChecked;
            this._gameInstance.createSpheres(1,5);
        });
        
        

        //radiobutton fase2        
        let radioButtonFase2 = new RadioButton();
        radioButtonFase2.width = "40px";
        radioButtonFase2.height = "40px";
        radioButtonFase2.color = "black";
        radioButtonFase2.background = "yellow";     

        radioButtonFase2.onIsCheckedChangedObservable.add((state) =>  {
            if (state) {
                this._gameInstance.createSpheres(2,5);
            }
        }); 

        
        let radioHeaderFase2 = Control.AddHeader(radioButtonFase2, "Fase2", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase2.height = "50px";
        radioHeaderFase2.children[1].fontSize = 40;
        radioHeaderFase2.children[1].onPointerDownObservable.add(function() {
            radioButtonFase2.isChecked = !radioButtonFase1.isChecked;            
        });

        
        //radiobutton fase3        
        let radioButtonFase3 = new RadioButton();
        radioButtonFase3.width = "40px";
        radioButtonFase3.height = "40px";
        radioButtonFase3.color = "black";
        radioButtonFase3.background = "orange";     

        radioButtonFase3.onIsCheckedChangedObservable.add((state) => {
            if (state) {
                this._gameInstance.createSpheres(3,5);
            }
        }); 
        
        let radioHeaderFase3 = Control.AddHeader(radioButtonFase3, "Fase3", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase3.height = "50px";
        radioHeaderFase3.children[1].fontSize = 40;
        radioHeaderFase3.children[1].onPointerDownObservable.add(function() {
            radioButtonFase3.isChecked = !radioButtonFase1.isChecked;
        });
       

        //radiobutton fase4
        let radioButtonFase4 = new RadioButton();
        radioButtonFase4.width = "40px";
        radioButtonFase4.height = "40px";
        radioButtonFase4.color = "black";
        radioButtonFase4.background = "red";     

        radioButtonFase4.onIsCheckedChangedObservable.add((state) => {
            if (state) {
                this._gameInstance.createSpheres(4,5);
            }
        }); 
        
        let radioHeaderFase4 =  Control.AddHeader(radioButtonFase4, "Fase4", "400px", { isHorizontal: true, controlFirst: true });
        radioHeaderFase4.height = "50px";
        radioHeaderFase4.children[1].fontSize = 40;
        radioHeaderFase4.children[1].onPointerDownObservable.add(function() {
            radioButtonFas43.isChecked = !radioButtonFase1.isChecked;
        });


        var button1 = Button.CreateSimpleButton("btnStart", "Iniciar");
        button1.width = 1;
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 10;
        button1.background = "green";
        button1.onPointerUpObservable.add(() => {
            let aluno = prompt("Nome do aluno", "guest");
            
            if (aluno == null || aluno == "") {
                alert("Favor Informar o nome do aluno");
            } else {
                this.disposeGUI();                
                this._gameInstance.start(nomeDoAluno);
                
            } 
        });

        
        panel.addControl(radioHeaderFase1);
        panel.addControl(radioHeaderFase2);
        panel.addControl(radioHeaderFase3);
        panel.addControl(radioHeaderFase4);
        
        panel.addControl(button1);
        //advancedTexture.addControl(iTxtUserName);

    }//showGui(){

}
