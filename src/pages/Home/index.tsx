import Button from '../../components/Button';
import { GridColumn, GridContainer, GridRow } from '../../components/Grid';
import TextInput from '../../components/TextInput';

const Home = () => {
  const onChangeInput = ()=>{

  }
  return (
    <>
    <div>&nbsp;</div>
      <div className='main' >
        <h1>Search</h1>
        <div className='box'>
          <GridContainer>
            <GridRow columns={3}>
              <GridColumn>
                <label htmlFor="date">Date & Time:</label>
              </GridColumn>
              <GridColumn>
                <TextInput 
                  name="date" 
                  id="date" 
                  placeHolder="dd/mm/yyyy"
                  onChange={onChangeInput}
                />
              </GridColumn>
              <GridColumn>
                <TextInput 
                  name="time" 
                  id="time" 
                  placeHolder="hh/mm"
                  onChange={onChangeInput}
                />
              </GridColumn>
            </GridRow>
            <GridRow columns={1}>
              <GridColumn><Button onClick={onChangeInput}>Search</Button></GridColumn>
            </GridRow>
          </GridContainer>
        </div>
      </div>
  </>
  );
}

export default Home;