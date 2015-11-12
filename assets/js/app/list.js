/*This is a list structure class  with its class Nodes*/

function LinkNode()
{
   this.data=null;
   this.next=null;

}
//*********Class Start here**********

function List()
{
  head=null;//declare a head object of LinkNode
//this function add item  to the the list,since javaScript is already generic in variable declaration
  this.add= function(data)
   {
      newData=new LinkNode();//create a new node to hold the data will added
      newData.data=data;
      newData.next=null;
      
      if(this.head==null)
         {
           this.head=newData;
           //alert("Working");
           return ;
         }
      
           //loop inside the list to find the last item

            trail=null;
            cur=this.head;
            while(cur !==null)
                 {
                   trail=cur;
                   cur=cur.next;
                 }
            trail.next=newData;
            //alert("Working next");
            return ;     
         
   };//end the  add  method


 this.dataAt=function(index)
   {
    //Checking if the index is valid
    var nsize=this.count();
   
    if(index < 0 || index >=nsize)
        { 
         if(index<0)
           {
             alert("index out of bound");
           }
         else
           {
             alert("index out of bound");
           }
         return null;
      	
        }
    else
     {
            
    if(this.head==null)
       {
         alert("Fatal error at getData():  there is no item on list");
         return null;
       }
       var poscounter = 0;  

       trail=this.head;
     current_loop :    //the loop start here     
       while(trail != null)
         {
         if(poscounter == index)
           {
 	      break current_loop;
           } 
          trail=trail.next;
          poscounter++;

	 }
        return  trail.data;
     }//end else statement
   
    };//end getData  method
      
  this.count=function()
    {
     if(this.head == null)
        {
         return 0;
	    }
     
     var counter=0;
     trail=this.head;
     while(trail !=null)
        {
           counter++;
           trail=trail.next;
	}
      return counter;  

      
    };//end method count() items in list

this.clear=function()
	{
	 
	  for(i = 0; i < this.count() ; i++)
		{
		  this.removeAt(i);
		  
		}		
	};
//this function items from the list object
this.removeAt= function(index)
    {
       var size=this.count();
	if(this.head == null || index < 0 || index > size )
	 {
	   alert("Fatal error at removeAt():  index out of bound");
           return null;           
	 }
       trail=null;
       cur=this.head;
       var counter= 0;

       loop_start:
       while(cur !== null)
       {
         if(counter == index)
            {
             break loop_start;
            }
         trail=cur;
         cur=cur.next;
         counter++;
       }

       if(this.head==cur)
          {
           this.head=this.head.next;
           delete cur;
      
          }
       else
          {
           trail.next=cur.next;
           delete cur;
          
          }


    };
//this function update	the data at the particular index
this.insertAt=function(index,data)
	{
	//the number of items 
	  var nItems=this.count();
	  if(head==null)
		return ;
	//check if the index is valid
	if(index<0 || index >=nItems)
		{
		  return ;
		}
		
		trail=null;
		cur=head;
		var counter=0;
		
	while(cur !=null)
		{
			if(index==counter)
				{
				//item index found 
				 break;
				}
			trail=cur;
			cur=cur.next;
			counter = counter + 1;
		}
		
		cur.data=data;
	 
	} ;


}//end class end brace




